import { useEffect, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ITooltipPortalProps {
  tagName?: keyof HTMLElementTagNameMap;
  children: ReactNode;
}

const Portal = ({ tagName = 'div', children }: ITooltipPortalProps) => {
  const elementRef = useRef(document.createElement(tagName));

  useEffect(() => {
    const element = elementRef.current;

    document.body.appendChild(element);

    return () => {
      document.body.removeChild(element);
    };
  }, []);

  return createPortal(children, elementRef.current);
};

export default Portal;
