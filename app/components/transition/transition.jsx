import { useEffect, useRef, useState } from 'react';

/**
 * Pure React replacement for the Framer Motion AnimatePresence-based Transition.
 * Identical interface and behaviour — no framer-motion dependency, no SSR mismatch.
 */
export const Transition = ({
  children,
  in: show,
  unmount,
  initial = true,
  timeout = 0,
  onEnter,
  onEntered,
  onExit,
  onExited,
  nodeRef: externalNodeRef,
}) => {
  const enterTimeoutRef = useRef();
  const exitTimeoutRef = useRef();
  const internalNodeRef = useRef(null);
  const nodeRef = externalNodeRef || internalNodeRef;
  const splitTimeout = typeof timeout === 'object';

  const [isMounted, setIsMounted] = useState(show || !unmount);
  const [status, setStatus] = useState(initial ? 'exited' : 'entered');
  const [hasEntered, setHasEntered] = useState(!initial);

  const visible = hasEntered && show;

  useEffect(() => {
    if (show) {
      clearTimeout(exitTimeoutRef.current);
      setIsMounted(true);

      if (!hasEntered) {
        const actualTimeout = splitTimeout ? timeout.enter : timeout;

        clearTimeout(enterTimeoutRef.current);

        setHasEntered(true);
        setStatus('entering');
        onEnter?.();

        nodeRef.current?.offsetHeight;

        enterTimeoutRef.current = setTimeout(() => {
          setStatus('entered');
          onEntered?.();
        }, actualTimeout);
      }
    } else {
      clearTimeout(enterTimeoutRef.current);

      if (!hasEntered) {
        setStatus('exited');
        return;
      }

      const actualTimeout = splitTimeout ? timeout.exit : timeout;

      setStatus('exiting');
      onExit?.();

      nodeRef.current?.offsetHeight;

      exitTimeoutRef.current = setTimeout(() => {
        setStatus('exited');
        onExited?.();
        if (unmount) setIsMounted(false);
      }, actualTimeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    return () => {
      clearTimeout(enterTimeoutRef.current);
      clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  if (!isMounted) return null;

  return children({ visible, status, nodeRef });
};
