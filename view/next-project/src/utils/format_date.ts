export const formatDate = (date: string) => {
  const datetime = date.replace('T', ' ').substring(0, date.length - 5);
  return datetime;
};
