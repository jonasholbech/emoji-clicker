export const round = (value, decimals = 1, fixed = true) => {
  const modifier = decimals * 10;
  let total = Math.round(value * modifier) / modifier;
  if (fixed) {
    return total.toFixed(decimals);
  }
  return total;
};
