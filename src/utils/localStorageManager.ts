const setItem = (token: string): void => {
  localStorage.setItem("token", token);
};

const getItem = (): string | null => {
  return localStorage.getItem("token");
};

const removeItem = () => {
    localStorage.removeItem("token");
}

export {
    setItem,
    getItem,
    removeItem
}