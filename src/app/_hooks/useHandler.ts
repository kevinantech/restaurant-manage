import { useState } from 'react';

/**
 * Handle the loading and error states of a request.
 *
 * If you want to set an custom error, you can do it by throwing an Error object inside the
 * handler function.
 */
const useHandler = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handler = async (f: () => Promise<void>) => {
    if (!!error) setError('');
    setLoading(true);
    try {
      setLoading(true);
      await f();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else console.warn(e);
    }
    setLoading(false);
  };

  return {
    handler,
    error,
    isLoading,
  };
};

export { useHandler };
