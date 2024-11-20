const path = require('path');

const mochaOvercoat = '/assets/mocha-overcoat.jpg';
const dreamGown = '/assets/dream-gown.jpg';
const rainJacket = '/assets/rain-jacket.jpg';
const merlotSuit = '/assets/merlot-suit.jpg';
const moonlightDress = '/assets/moonlight-dress.jpg';
const denimPioneer = '/assets/denim-pioneer.jpg';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    image: mochaOvercoat,
    title: 'Majestic Vintage Mocha Overcoat',
    price: 12999,
    description:
      'Channel timeless sophistication with this stunning mocha overcoat. Crafted for the discerning gentleman who appreciates the fine blend of vintage charm and modern elegance.',
  },
  {
    id: 'p2',
    image: dreamGown,
    title: 'Enchanting Blush Dream Gown',
    price: 18999,
    description:
      'Bask in the glow of elegance with our Enchanting Blush Dream Gown. Embody the regality of a queen with a sweet touch of pink that whispers enchantment. This is the perfect piece for those seeking to create unforgettable moments.',
  },
  {
    id: 'p3',
    image: rainJacket,
    title: 'Rain Jacket',
    price: 9999,
    description: 'Stay dry and stylish with our Rain Jacket. Perfect for those rainy days when you still want to look your best.',
  },
  {
    id: 'p4',
    image: merlotSuit,
    title: 'Merlot Suit',
    price: 24999,
    description: 'Make a statement with our Merlot Suit. The rich color and tailored fit make it perfect for any formal occasion.',
  },
  {
    id: 'p5',
    image: moonlightDress,
    title: 'Moonlight Dress',
    price: 17999,
    description: 'Shine bright in our Moonlight Dress. The perfect choice for an evening out or a special event.',
  },
  {
    id: 'p6',
    image: denimPioneer,
    title: 'Denim Pioneer',
    price: 8999,
    description: 'Embrace the classic look with our Denim Pioneer. A timeless piece that never goes out of style.',
  },
];

module.exports = DUMMY_PRODUCTS;