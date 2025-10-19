// UI state management types

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export interface AsyncState<T> {
  status: LoadingStatus;
  data: T | null;
  error: Error | null;
}

export interface ErrorState {
  message: string;
  code?: string;
  retryable: boolean;
}

// Helper function to create initial async state
export function createAsyncState<T>(): AsyncState<T> {
  return {
    status: 'idle',
    data: null,
    error: null,
  };
}

// Helper function to create loading state
export function loadingState<T>(prevData: T | null = null): AsyncState<T> {
  return {
    status: 'loading',
    data: prevData,
    error: null,
  };
}

// Helper function to create success state
export function successState<T>(data: T): AsyncState<T> {
  return {
    status: data && Array.isArray(data) && data.length === 0 ? 'empty' : 'success',
    data,
    error: null,
  };
}

// Helper function to create error state
export function errorState<T>(error: Error): AsyncState<T> {
  return {
    status: 'error',
    data: null,
    error,
  };
}
