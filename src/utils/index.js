export const initialCities = ["Dubai", "New York", "London", "Tokyo", "Sydney"];

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "N/A";
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  } catch (error) {
    return "Invalid time";
  }
};
