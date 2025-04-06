export type ServiceStateType =
  | 'Running'
  | 'Stopped'
  | 'Restarting'
  | 'Stopping'
  | 'Starting'
  | 'N/A';

export interface ServiceCardProps {
  readonly title?: string;
  readonly description?: string;
  readonly initialState?: ServiceStateType;
  readonly commandName: string;
  readonly onLog?: (log: string) => void;
}

export interface ServiceStateProps extends React.ComponentPropsWithRef<'div'> {
  readonly state: string;
}
