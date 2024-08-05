import { useEffect, useRef, RefObject } from 'react';

// MediaQueryList Event based useEventListener interface
function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList>,
): void;

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
): void;

// Element Event based useEventListener interface
function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<T>,
): void;

// Document Event based useEventListener interface
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document>,
): void;

function useEventListener<
  WindowEventKey extends keyof WindowEventMap,
  HTMLElementEventKey extends keyof HTMLElementEventMap,
  MediaQueryEventKey extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList = HTMLElement,
>(
  eventName: WindowEventKey | HTMLElementEventKey | MediaQueryEventKey,
  handler: (
    event:
      | WindowEventMap[WindowEventKey]
      | HTMLElementEventMap[HTMLElementEventKey]
      | MediaQueryListEventMap[MediaQueryEventKey]
      | Event,
  ) => void,
  element?: RefObject<T>,
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element?.current ?? window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    const listener: typeof handler = (event) => {
      savedHandler.current(event);
    };

    targetElement.addEventListener(eventName, listener);

    return () => {
      targetElement.removeEventListener(eventName, listener);
    };
  }, [eventName, element]);
}

export default useEventListener;
