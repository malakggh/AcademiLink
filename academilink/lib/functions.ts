export function decodeAvailability(availabilityFlags: number) {
  if (availabilityFlags < 0 || availabilityFlags > 127) {
    throw new Error("Invalid availability flags");
  }
  // 1 for Sunday, 2 for Monday, 4 for Tuesday, 8 for Wednesday, 16 for Thursday, 32 for Friday, 64 for Saturday

  const daysOfWeek = [
    { flag: 1, day: "א" },
    { flag: 2, day: "ב" },
    { flag: 4, day: "ג" },
    { flag: 8, day: "ד" },
    { flag: 16, day: "ה" },
    { flag: 32, day: "ו" },
    { flag: 64, day: "שבת" },
  ];

  const availableDays = daysOfWeek
    .filter(({ flag }) => (availabilityFlags & flag) === flag)
    .map(({ day }) => day);

  return availableDays;
}
