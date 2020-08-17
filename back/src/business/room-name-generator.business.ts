const baseNames = [
  'FISTRO',
  'PECADOR',
  'PRADERA',
  'NOPUEDOR',
  'JARL',
  'REACT',
  'CURRY',
  'HOOKS',
  'KETCHUP',
  'TURING',
  'ALAN',
  'CHUCK',
  'NORRIS',
  'DELAWARE',
  'MALAGA',
  'PALO',
  'VALLEY',
  'LEMON',
];

const generateRandomNumberRange = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;
};

// TODO Unit test this
const chooseBaseName = (): string => {
  const maxNumber = baseNames.length - 1;
  const randomNumber = generateRandomNumberRange(0, maxNumber);

  return baseNames[randomNumber];
};

const generateRandomRoomSuffix = (): string => {
  const randomNumber = generateRandomNumberRange(0, 9999);

  return randomNumber.toString();
};

export const generateNewRoomName = () => {
  return chooseBaseName() + '-' + generateRandomRoomSuffix();
};
