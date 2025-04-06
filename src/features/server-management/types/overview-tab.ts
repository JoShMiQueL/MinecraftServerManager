import type { LucideProps } from 'lucide-react';

export interface CardItemProps {
  readonly title?: string;
  readonly icon?: React.ComponentType<LucideProps>;
  readonly description?: string;
  readonly iconProps?: Partial<LucideProps>;
}
