export const getInfoBoxDimensions = (
  X1: number,
  X2: number,
  Y1: number,
  Y2: number
) => {
  const width = X2 - X1;
  const height = Y2 - Y1;

  return { width, height };
};
