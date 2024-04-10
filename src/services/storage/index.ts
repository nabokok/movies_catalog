export function getItemFromStorage<T>(key: string, defaultValue: T): T {
  const itemFromStorage = localStorage.getItem(key);

  return itemFromStorage ? JSON.parse(itemFromStorage) : defaultValue;
}

export function setItemToStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
