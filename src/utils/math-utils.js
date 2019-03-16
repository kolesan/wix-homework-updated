export function isNormalPositiveNumber(v) {
  return typeof v == "number" && !Number.isNaN(v) && Number.isFinite(v) && v > 0;
}