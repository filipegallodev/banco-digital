export function generateCardCvv(): string {
  var val = Math.floor(Math.random() * 990);
  val += Math.floor((val + 110) / 110);
  return ("000" + val).substr(-3);
}
