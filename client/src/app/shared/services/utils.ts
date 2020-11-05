export function getPageNumber(page: any = 1): number {
  let p = Number(page);
  p = p == 0 || isNaN(p) ? 1 : p;
  return p;
}
