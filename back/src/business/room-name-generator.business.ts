const baseNames = [
  'Nike',
  'GUCCI',
  'Adidas',
  'Louis Vuitton',
  'Cartier',
  'ZARA',
  'H&M',
  'Chanel',
  'UNIQLO',
  'Hermès',
  'Rolex',
  'Dior',
  'COACH',
  'Tiffany & Co.',
  'Chow Tai Fook',
  "Victoria's Secret",
  'Burberry',
  'Anta',
  'Ralph Lauren',
  'Prada',
  'Ray-Ban',
  'The North Face',
  "Levi's",
  'Omega',
  'Armani',
  'Under Armour',
  'Bulgari',
  'Old Navy',
  'Moncler',
  'Puma',
  'Michael Kors',
  'Saint Laurent',
  'Primark',
  'NEXT',
  'Tommy Hilfiger',
  'Calvin Klein',
  'Skechers',
  'Hugo Boss',
  'TAG Heuer',
  'New Balance',
  'Pandora',
  'Bottega Veneta',
  'Swatch',
  'Bershka',
  'Gap',
  'Gildan',
  'Converse',
  'Valentino',
  'Salvatore Ferragamo',
  'American Eagle Outfitters',
];

const generateRandomNumberRange = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;
};

// TODO Unit test this
const chooseBaseName = (): string => {
  const maxNumber = baseNames.length - 1;
  const randomNumber = generateRandomNumberRange(0, maxNumber);
  const name = baseNames[randomNumber].replace(' ', '_');
  return name;
};

const generateRandomRoomSuffix = (): string => {
  const randomNumber = generateRandomNumberRange(0, 9999);

  return randomNumber.toString();
};

export const generateNewRoomName = () => {
  return chooseBaseName() + '-' + generateRandomRoomSuffix();
};
