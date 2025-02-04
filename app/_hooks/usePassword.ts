import { useState } from 'react';

const usePassword = () => {
  const [type, setType] = useState<'text' | 'password'>('password');
  const toggle = () => setType(type === 'password' ? 'text' : 'password');

  return {
    type,
    toggle,
  };
};

export { usePassword };
