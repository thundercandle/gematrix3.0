const values = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 9,
  k: 3,
  l: 10,
  m: 11,
  n: 12,
  o: 13,
  p: 14,
  q: 15,
  r: 16,
  s: 17,
  t: 18,
  u: 19,
  v: 19,
  w: 19,
  x: 20,
  y: 21,
  z: 22
};

function total(numberArray) {
  return numberArray.reduce((prev, curr) => prev + curr);
}

function stripSpaces(wordArray) {
  return wordArray.filter(letter => letter !== " ");
}

function enumerate(wordArray) {
  return stripSpaces(wordArray).map(letter => values[letter.toLowerCase()]);
}

function split(word) {
  return word.split("");
}

function add(word) {
  return total(enumerate(split(word)));
}
