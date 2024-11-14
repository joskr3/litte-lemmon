const guardarEnLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const obtenerDeLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const eliminarDeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { guardarEnLocalStorage, obtenerDeLocalStorage, eliminarDeLocalStorage };
