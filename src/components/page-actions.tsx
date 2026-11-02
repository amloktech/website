import { ArrowUpRight } from 'lucide-react';
import { BookingLink } from './booking-link';

type PageActionsProps = {
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

/** The shared marketing CTA pair; navigation and interactive controls keep their own labels. */
export function PageActions({
  className = 'cp-actions',
  primaryClassName = 'cp-button',
  secondaryClassName = 'cp-text-link',
}: PageActionsProps) {
  return <div className={`page-actions ${className}`}>
    <BookingLink className={primaryClassName}>Talk to us <ArrowUpRight size={18} aria-hidden="true"/></BookingLink>
    <a className={secondaryClassName} href="https://docs.amlok.io/api-reference/overview">Explore API <ArrowUpRight size={18} aria-hidden="true"/></a>
  </div>;
}
