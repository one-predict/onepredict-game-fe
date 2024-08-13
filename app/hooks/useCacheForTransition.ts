import React, { ReactNode, useEffect, useState } from 'react';

interface ITransitionEventHandler {
  (event: React.TransitionEvent<HTMLElement>): void;
}

type ProvidedValues<Children> = [Children, ITransitionEventHandler];

const useCacheForTransition = <Children = ReactNode>(children: Children): ProvidedValues<Children> => {
  const [childNode, setChildNode] = useState<Children>(children);

  const onTransitionEnd = ({ target, currentTarget }: React.TransitionEvent<HTMLElement>) => {
    if (target !== currentTarget) {
      return;
    }
    if (!children) {
      setChildNode(children);
    }
  };

  useEffect(() => {
    if (children) {
      setChildNode(children);
    }
  }, [children]);

  return [children || childNode, onTransitionEnd];
};

export default useCacheForTransition;
