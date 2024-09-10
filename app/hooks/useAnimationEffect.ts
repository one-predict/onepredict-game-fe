import { useCallback, useEffect, useRef, useState } from 'react';

const useAnimationEffect = (effectTimeout: number) => {
  const timeoutRef = useRef<number>();

  const [effectId, setEffectId] = useState(0);

  const showEffect = useCallback(() => {
    setEffectId((previousEffectId) => previousEffectId + 1);

    const timeoutId = timeoutRef.current;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutRef.current = setTimeout(() => {
      setEffectId(0);
    }, effectTimeout);
  }, [setEffectId, effectTimeout]);

  useEffect(() => {
    return () => {
      const timeoutId = timeoutRef.current;

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutRef]);

  return [effectId, showEffect, effectTimeout];
};

export default useAnimationEffect;
