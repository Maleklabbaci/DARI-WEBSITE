
import { Property, PropertyType, TransactionType } from './types';

export const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", 
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", 
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annab", "Guelma", 
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", 
  "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", 
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", 
  "Ghardaïa", "Relizane"
];

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'apartment', label: 'Appartement' },
  { value: 'house', label: 'Maison / Villa' },
  { value: 'studio', label: 'Studio' },
  { value: 'commercial', label: 'Local commercial' },
  { value: 'office', label: 'Bureau' },
  { value: 'warehouse', label: 'Entrepôt' },
  { value: 'land', label: 'Terrain' }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Magnifique F4 avec vue sur mer',
    description: 'Situé dans une résidence calme et sécurisée, cet appartement offre une vue imprenable sur la baie d\'Alger.',
    price: 35000000,
    surface: 120,
    type: 'apartment',
    transaction: 'buy',
    city: 'Bab El Oued',
    wilaya: 'Alger',
    rooms: 4,
    bedrooms: 3,
    floor: 5,
    hasElevator: true,
    hasParking: true,
    images: ['https://picsum.photos/seed/prop1/800/600', 'https://picsum.photos/seed/prop1b/800/600'],
    sellerId: 's1',
    sellerName: 'Immo Pro Alger',
    sellerType: 'agency',
    createdAt: '2024-03-20'
  },
  {
    id: '2',
    title: 'Studio moderne centre-ville',
    description: 'Petit studio idéal pour étudiant ou jeune travailleur. Entièrement rénové.',
    price: 45000,
    surface: 35,
    type: 'studio',
    transaction: 'rent',
    city: 'Centre Ville',
    wilaya: 'Oran',
    rooms: 1,
    floor: 2,
    images: ['https://picsum.photos/seed/prop2/800/600'],
    sellerId: 's2',
    sellerName: 'Ahmed B.',
    sellerType: 'individual',
    createdAt: '2024-03-18'
  },
  {
    id: '3',
    title: 'Local commercial stratégique',
    description: 'Local de 80m² sur un axe très passant. Idéal pour boutique ou showroom.',
    price: 150000,
    surface: 80,
    type: 'commercial',
    transaction: 'rent',
    city: 'Kouba',
    wilaya: 'Alger',
    images: ['https://picsum.photos/seed/prop3/800/600'],
    sellerId: 's1',
    sellerName: 'Immo Pro Alger',
    sellerType: 'agency',
    createdAt: '2024-03-15'
  }
];
