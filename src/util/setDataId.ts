export const setDataId = (value: string) => {
  if (process.env.NODE_ENV === "test") {
    return {
      "data-testid": value
    };
  } else {
    return {};
  }
};
