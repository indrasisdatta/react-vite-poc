export const currencyFormat = (num: number, cur = "$") => {
  if (Math.floor(num) !== num) {
    num = Number(num.toFixed(2));
  }
  return (cur + num).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
