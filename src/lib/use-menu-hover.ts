'use client';

import { useEffect, useRef, type PointerEvent } from 'react';

export function useMenuHover(onOpen:()=>void,onClose:()=>void) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return {
    onPointerEnter:(event:PointerEvent<HTMLElement>) => {
      if (event.pointerType !== 'mouse') return;
      clear();
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) onOpen();
    },
    onPointerLeave:(event:PointerEvent<HTMLElement>) => {
      if (event.pointerType !== 'mouse') return;
      clear();
      timer.current = setTimeout(onClose,200);
    },
  };
}

export function isHoverPointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}
