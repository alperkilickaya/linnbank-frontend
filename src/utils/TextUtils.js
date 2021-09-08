export const capitalize = (text, str, locale = navigator.language) => {
  if (text) {
    const [first, ...rest] = text;
    return first.toLocaleUpperCase(locale) + rest.join("");
  } else {
    return str;
  }
};
