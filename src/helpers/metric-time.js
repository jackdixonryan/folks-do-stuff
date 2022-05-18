function convert(integer) {
  if (integer < 0) {
    throw new Error("INVALID_TIMESTAMP");
  }

  integer = Math.ceil(integer); // no such thing as sub-loops

  let remainder = integer; 

  let teras = 0;
  let gigas = 0;
  let megas = 0;
  let kilos = 0;
  let hectos = 0;
  let decas = 0;

  if (remainder > 999999999999) {
    teras = Math.floor(remainder / 1000000000000);
    remainder = remainder % 1000000000000;
  }

  if (remainder > 999999999) {
    gigas = Math.floor(remainder / 1000000000);
    remainder = remainder % 1000000000;
  }

  if (remainder > 999999) {
    megas = Math.floor(remainder / 1000000);
    remainder = remainder % 1000000;
  }

  if (remainder > 999) {
    kilos = Math.floor(remainder / 1000);
    remainder = remainder % 1000;
  }

  if (remainder > 99) {
    hectos = Math.floor(remainder / 100);
    remainder = remainder % 100;
  }

  if (remainder > 9) {
    decas = Math.floor(remainder / 10);
    remainder = remainder % 10;
  }

  const teraloops = teras.toString().padStart(3, "0");
  const gigaloops = gigas.toString().padStart(3, "0");
  const megaloops = megas.toString().padStart(3, "0");
  const kiloloops = kilos.toString().padStart(3, "0"); 
  const hectoloops = hectos.toString().padStart(2, "0");
  const decaloops = decas.toString().padStart(2, "0");
  const loops = remainder.toString().padStart(2, "0");

  return `${teraloops}.${gigaloops}.${megaloops}.${kiloloops}.${hectoloops}.${decaloops}.${loops}`;

}

function deformat(time) { 
  let elapsedTotal = 0;
  let multiplier = 1; 
  const elements = time.split(".");

  for (let i = elements.length - 1; i > 0; i--) {
    const element = elements[i];
    if (i > 3) {
      elapsedTotal += parseInt(element, 10) * multiplier;
      multiplier = multiplier * 10;
    } else {
      elapsedTotal += parseInt(element, 10) * multiplier;
      multiplier = multiplier * 1000;
    }
  }

  return elapsedTotal;
}

module.exports = { convert, deformat };