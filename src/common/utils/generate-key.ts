const generateKey = (text: string) => {
  return [text, Math.random().toString(16).slice(2), Date.now().toString(16)].join("-");
};

export { generateKey };
