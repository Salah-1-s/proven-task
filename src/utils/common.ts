/**
 * group array of boxes by their class names
 * @param boxes
 * @param key
 * @returns
 */
export function groupByClassName<T>(boxes: T[], key: keyof T) {
  const groupedResult = boxes.reduce((previous, current, index) => {
    if (!previous[current[key]]) {
      previous[current[key]] = [] as T[];
    }

    previous[current[key]].push({ ...current, index });
    return previous;
  }, {} as any);
  return groupedResult;
}
