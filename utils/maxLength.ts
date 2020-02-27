export function maxLength(str) {
  if (str.length > 28) {
    return str.slice(0, 28) + "..."
  }

  return str
}
