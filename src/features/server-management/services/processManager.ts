import { Command, Child, TerminatedPayload } from '@tauri-apps/plugin-shell';

interface ProcessOutput {
  type: 'stdout' | 'stderr';
  data: string;
}

class ProcessManager {
  private processes: Map<string, { command: Command<string>; child: Child | null }> = new Map();
  private listeners: Map<string, Set<(output: ProcessOutput) => void>> = new Map();
  private formatDate(date: Date): string {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  getProcesses() {
    return this.processes;
  }

  async startProcess(serviceId: string, args: string[] = []) {
    const cmd = Command.create(serviceId, args);

    // Configure stdout/stderr handlers
    cmd.stdout.on('data', (line: string) => {
      this.notifyListeners(serviceId, {
        type: 'stdout',
        data: line
      });
    });

    cmd.stderr.on('data', (line: string) => {
      this.notifyListeners(serviceId, {
        type: 'stderr',
        data: line
      });
    });

    cmd.on('close', (code: TerminatedPayload) => {
      const terminationReason =
        code.code === 1 ? 'stopped by user' : code.code === -1 ? 'force stopped' : 'unknown reason';
      this.notifyListeners(serviceId, {
        type: 'stdout',
        data: `Process exited (${terminationReason})`
      });
    });

    // Spawn the process
    this.notifyListeners(serviceId, {
      type: 'stdout',
      data: 'Starting process...'
    });
    const child = await cmd.spawn();
    this.notifyListeners(serviceId, {
      type: 'stdout',
      data: `Process started with PID ${child.pid}`
    });
    this.processes.set(serviceId, { command: cmd, child });

    return { command: cmd, child };
  }

  async stopProcess(serviceId: string) {
    const process = this.processes.get(serviceId);
    if (process) {
      if (process.child) {
        this.notifyListeners(serviceId, {
          type: 'stdout',
          data: `Stopping process with PID ${process.child.pid}...`
        });
        process.child.kill();
        this.notifyListeners(serviceId, {
          type: 'stdout',
          data: `Process stopped with PID ${process.child.pid}`
        });
      }
      this.processes.delete(serviceId);
    }
  }

  async stopAllProcesses() {
    const processes = Array.from(this.processes.keys());
    await Promise.all(processes.map((serviceId) => this.stopProcess(serviceId)));
  }

  subscribeToOutput(serviceId: string, callback: (output: ProcessOutput) => void) {
    if (!this.listeners.has(serviceId)) {
      this.listeners.set(serviceId, new Set());
    }
    this.listeners.get(serviceId)?.add(callback);

    return () => {
      this.listeners.get(serviceId)?.delete(callback);
    };
  }

  private notifyListeners(serviceId: string, output: ProcessOutput) {
    this.listeners.get(serviceId)?.forEach((listener) =>
      listener({
        type: output.type,
        data: `[${this.formatDate(new Date())}] ${output.data}`
      })
    );
  }
}

export const processManager = new ProcessManager();
