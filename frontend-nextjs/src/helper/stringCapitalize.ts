export function stringCapitalize(text: string) {
  let textCapitalized = text
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word.length >= 1);
  for (let i = 0; i < textCapitalized.length; i++) {
    textCapitalized[i] =
      textCapitalized[i][0].toUpperCase() + textCapitalized[i].substring(1);
  }
  return textCapitalized;
}
