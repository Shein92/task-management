const regexp = /^[A-Za-z0-9_.\s]+$/;

export const validator = (text: string) => {
  if (regexp.test(text)) {
    return true;
  } else {
    return false;
  }
};
