import { Link } from 'react-router-dom';
import brand from '../config/brand';

export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = `btn btn-${variant} ${className}`.trim();
  const sharedProps = {
    className: classes,
    'aria-label': props['aria-label'] || `${brand.name} ${String(children)}`,
    ...props,
  };

  if (to) {
    return <Link to={to} {...sharedProps}>{children}</Link>;
  }

  if (href) {
    return <a href={href} target="_blank" rel="noreferrer" {...sharedProps}>{children}</a>;
  }

  return <button type={type} {...sharedProps}>{children}</button>;
}
