import React, { useEffect, useRef } from 'react';

export interface AICursorGuideHandle {
  flyTo: (
    from: { x: number; y: number } | string,
    targetId: string,
    label?: string,
    onArrive?: () => void
  ) => void;
  stop: () => void;
}

interface AICursorGuideProps {
  onRegisterHandle?: (handle: AICursorGuideHandle) => void;
}

export const AICursorGuide: React.FC<AICursorGuideProps> = ({ onRegisterHandle }) => {
  const activeHighlightRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearHighlight = () => {
    if (activeHighlightRef.current) {
      activeHighlightRef.current.classList.remove(
        'ring-2',
        'ring-cyan-400',
        'ring-offset-2',
        'ring-offset-[#090d16]',
        'shadow-[0_0_30px_rgba(6,182,212,0.45)]'
      );
      activeHighlightRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const navigateTo = (
    _from: { x: number; y: number } | string,
    targetId: string,
    _label: string = '',
    onArrive?: () => void
  ) => {
    clearHighlight();

    const targetEl = document.getElementById(targetId);
    if (!targetEl) {
      if (onArrive) onArrive();
      return;
    }

    // Gerak langsung sekali pencet ke elemen tujuan dengan smooth scroll
    targetEl.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    // Berikan efek highlight fokus di elemen yang dituju
    targetEl.classList.add(
      'ring-2',
      'ring-cyan-400',
      'ring-offset-2',
      'ring-offset-[#090d16]',
      'shadow-[0_0_30px_rgba(6,182,212,0.45)]',
      'transition-all',
      'duration-300'
    );
    activeHighlightRef.current = targetEl;

    if (onArrive) onArrive();

    // Hapus highlight setelah fokus tercapai
    timeoutRef.current = setTimeout(() => {
      clearHighlight();
    }, 1200);
  };

  useEffect(() => {
    if (onRegisterHandle) {
      onRegisterHandle({
        flyTo: navigateTo,
        stop: clearHighlight,
      });
    }
    return () => {
      clearHighlight();
    };
  }, []);

  // Tidak ada panah atau kursor berjalan yang mengambang
  return null;
};
