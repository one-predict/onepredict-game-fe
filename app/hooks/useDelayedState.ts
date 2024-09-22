import { useCallback, useRef, useState } from 'react';

const useDelayedState = <T>(initialState: T, delay: number) => {
  const [state, setState] = useState<T>(initialState);
  const timerRef = useRef<number>();

  const setDelayedState = useCallback(
    (newState: T) => {
      const timerId = timerRef.current;

      if (timerId) {
        clearTimeout(timerId);
      }

      timerRef.current = setTimeout(() => {
        setState(newState);
      }, delay);
    },
    [timerRef, delay],
  );

  return [state, setDelayedState] as const;
};

export default useDelayedState;
