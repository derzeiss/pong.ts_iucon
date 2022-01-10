import { useState, useCallback } from 'react';

/**
 * Basic state enum, suitable for most components.
 */
export enum BasicState {
  Initial = 'initial',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

interface IStateMachine<T> {
  state: T;
  msg: string;
  nextState: (state: T, msg?: string) => void;
}

/**
 * Component to provide a state machine for many standard components.
 * returns current state, message for current state and a transition function to go to the next state
 */
export function useStateMachine<T>(initialState: T): IStateMachine<T> {
  const [state, setState] = useState<T>(initialState);
  const [msg, setMsg] = useState<string>('');

  const nextState = useCallback((state: T, msg?: string) => {
    setState(state);
    setMsg(msg || '');
  }, []);

  return { state, msg, nextState };
}
