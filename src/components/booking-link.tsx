'use client';

import type { ComponentProps } from 'react';
import { booking, bookingLinkProps } from '@/lib/booking';

type CalWindow = Window & {
  Cal?: {
    ns?: Record<string, (method: 'modal', options: { calLink: string; config: typeof booking.config }) => void>;
  };
};

export function BookingLink({ onClick, ...props }: Omit<ComponentProps<'a'>, 'href' | 'onClickCapture'>) {
  return <a {...props} {...bookingLinkProps} onClickCapture={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const cal = (window as CalWindow).Cal?.ns?.[booking.namespace];
    if (!cal) return;
    event.preventDefault();
    // Invoke the queue directly so clicks also work while Cal is still loading.
    // Capture the click before Cal's document listener can open a second modal.
    event.stopPropagation();
    // Let a mobile navigation dialog finish closing before Cal takes focus.
    window.requestAnimationFrame(() => cal('modal', { calLink: booking.link, config: booking.config }));
  }}/>;
}
