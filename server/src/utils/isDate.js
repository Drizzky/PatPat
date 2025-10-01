const isDate = (dateString = '') => {
  // Check format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  // Check if date is valid and matches input (handles invalid dates like 2023-02-30)
  const isValid = date instanceof Date && !isNaN(date) && date.toISOString().slice(0, 10) === dateString;

  return isValid;
};

export default isDate;
