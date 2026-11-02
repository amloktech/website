export const booking = {
  link: 'imleti/1-hr-meeting',
  namespace: '1-hr-meeting',
  origin: 'https://app.cal.com',
  config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
} as const;

/** Keep the direct booking link as a fallback when the embed is unavailable. */
export const bookingLinkProps = {
  href: `https://cal.com/${booking.link}`,
  'data-cal-link': booking.link,
  'data-cal-namespace': booking.namespace,
  'data-cal-config': JSON.stringify(booking.config),
  'aria-haspopup': 'dialog',
} as const;
