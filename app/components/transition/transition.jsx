import { useEffect, useRef, useState } from 'react';

/**
 * Pure React replacement for the Framer Motion AnimatePresence-based Transition.
 * When mounted with in=true and initial=true, starts directly in 'entering' state
 * so there is no blank frame between mount and the first useEffect run.
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

  // When show=true on initial mount, start directly in 'entering' — no blank frame.
  const initiallyEntering = initial && show;

  const [isMounted, setIsMounted] = useState(show || !unmount);
  const [status, setStatus] = useState(
    !initial ? 'entered' : show ? 'entering' : 'exited'
  );
  const [hasEntered, setHasEntered] = useState(!initial || show);

  const visible = hasEntered && show;

  // If we initialised directly into 'entering', schedule the timeout to 'entered'
  // from a mount effect so useEffect([show]) won't double-schedule.
  const didInitialEnterRef = useRef(initiallyEntering);
  useEffect(() => {
    if (!didInitialEnterRef.current) return;
    const actualTimeout = splitTimeout ? timeout.enter : timeout;
    onEnter?.();
    enterTimeoutRef.current = setTimeout(() => {
      setStatus('entered');
      onEntered?.();
    }, actualTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (show) {
      clearTimeout(exitTimeoutRef.current);
      setIsMounted(true);

      // Only (re-)enter if we haven't entered yet.
      // Skip when the initial mount already handled it via didInitialEnterRef.
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
