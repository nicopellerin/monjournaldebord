export function maxLength(str, len = 28) {
  if (str.length > len) {
    return str.slice(0, len) + "..."
  }

  return str
}
