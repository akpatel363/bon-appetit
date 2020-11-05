function getPageNumber(page = 1) {
  let p = parseInt(page);
  p = !isNaN(p) && p > 0 ? p : 1;
  return p - 1;
}

module.exports = { getPageNumber };
