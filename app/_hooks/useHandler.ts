import { useState } from 'react';

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
