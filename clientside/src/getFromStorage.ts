export function userDetailsFromStorage() {
  const userDetailsString = localStorage.getItem("userDetails");
  if (!userDetailsString) {
    return null;
  }
  return JSON.parse(userDetailsString);
}
