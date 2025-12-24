import { useState } from 'react';

const useTogglePassword = () => {
  const [textType, setTextType] = useState<'text' | 'password'>('password');
  const toggle = () => setTextType(textType === 'password' ? 'text' : 'password');
  return { textType, toggle };
};

export { useTogglePassword };
