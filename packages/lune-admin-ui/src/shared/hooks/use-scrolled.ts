import { type RefObject, useEffect, useRef, useState } from 'react';

export const useScrolled = <T extends HTMLElement>(): [RefObject<T | null>, boolean] => {
  const ref = useRef<T>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const handleScroll = () => setIsScrolled(el.scrollTop > 0);

    el.addEventListener('scroll', handleScroll);

    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return [ref, isScrolled];
};
