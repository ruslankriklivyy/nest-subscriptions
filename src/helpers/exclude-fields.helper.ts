export function excludeFields(user: any, keys: string[]): Omit<any, string> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}
