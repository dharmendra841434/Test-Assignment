export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
export const getCurrentDate = () => {
  const date = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};
