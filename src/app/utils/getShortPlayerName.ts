import nameInfoJson from "../../../data/name_info.json";

type NameInfo = any;

const nameInfo: NameInfo = nameInfoJson;

export const getShortPlayerName = (fullName: string): string => {
  if (!fullName) return ""; // Handle empty cases

  if (nameInfo[fullName]) {
    return nameInfo[fullName][0];
  }

  const parts = fullName.split(" ");
  if (parts.length < 2) return fullName; // If there's no last name, return as is

  const firstInitial = parts[0][0].toUpperCase(); // First letter of the first name
  const lastName = parts.slice(1).join(" "); // Keep full last name in case of multi-part names

  return `${firstInitial}. ${lastName}`;
};
