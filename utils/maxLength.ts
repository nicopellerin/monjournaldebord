export function maxLength(str: String, len = 28) {
  if (str?.length > len) {
    return str.slice(0, len) + '...'
  }

  return str
}
