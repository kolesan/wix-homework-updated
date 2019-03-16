export function dimensions({w, h}) {
  return { w, h };
}

export function arrayOfSize(n, value) {
  return [...new Array(n)].map(() => value)
}