import { ArrowUpRight } from 'lucide-react';
import type { ResearchResource } from '@/content/research-resources';

type ResearchActionProps = {
  resource: Pick<ResearchResource, 'format'> & { href?: string };
  className?: string;
  availabilityId: string;
};

/** Reading becomes available when the resource has a publication URL. */
export function ResearchAction({ resource, className, availabilityId }: ResearchActionProps) {
  const label = `Read ${resource.format.toLowerCase()}`;
  const content = <>{label} <ArrowUpRight size={18} aria-hidden="true"/></>;
  return resource.href
    ? <a className={className} href={resource.href}>{content}</a>
    : <button className={className} type="button" disabled aria-describedby={availabilityId}>{content}</button>;
}
