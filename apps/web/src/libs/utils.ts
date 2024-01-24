export function numberWithCommas(x: number | string) {
  if (!x) return "0";

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
