/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

const useAsyncEffect = (callback: () => Promise<void>, deps: unknown[] | undefined) => {
  useEffect(() => {
    (async () => {
      await callback();
    })();
  }, deps);
};

export default useAsyncEffect;
