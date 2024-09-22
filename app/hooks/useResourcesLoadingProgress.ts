/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';

export const SkipToken = Symbol('SkipToken');
const MAX_PROGRESS = 100;

const useResourcesLoadingProgress = (resources: unknown[]) => {
  const progress = useMemo(() => {
    const { availableResourcesCount, loadedResourcesCount } = resources.reduce(
      (result, resource) => {
        if (resource === SkipToken) {
          return result;
        }

        result.availableResourcesCount = result.availableResourcesCount + 1;

        if (resource) {
          result.loadedResourcesCount = result.loadedResourcesCount + 1;
        }

        return result;
      },
      {
        availableResourcesCount: 0,
        loadedResourcesCount: 0,
      },
    );

    return (loadedResourcesCount / availableResourcesCount) * MAX_PROGRESS;
  }, [...resources]);

  return [progress, progress === MAX_PROGRESS] as const;
};

export default useResourcesLoadingProgress;
