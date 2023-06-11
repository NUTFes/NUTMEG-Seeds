export const snakeToCamel = (obj: { [key: string]: any }): object => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const newObj: { [key: string]: any } = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
    newObj[newKey] = obj[key];
  });
  return newObj;
};

export const camelToSnake = (obj: { [key: string]: any }): object => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const newObj: { [key: string]: any } = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/([A-Z])/g, ($1) => {
      return `_${$1.toLowerCase()}`;
    });
    newObj[newKey] = obj[key];
  });
  return newObj;
};
