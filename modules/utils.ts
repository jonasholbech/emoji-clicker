export const round = (
  value: number,
  decimals: number = 1,
  fixed: boolean = true
): number => {
  const modifier = decimals * 10;
  let total = Math.round(value * modifier) / modifier;
  if (fixed) {
    return Number(total.toFixed(decimals));
  }
  return total;
};
