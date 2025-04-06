interface SiteTitleProps extends React.ComponentProps<'div'> {
  title: string;
  subtitle: string;
}

export function SiteTitle({ title, subtitle, ...props }: SiteTitleProps) {
  return (
    <div {...props}>
      <h3 className="text-3xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
