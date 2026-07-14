import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Define relative file paths for input Excel and output TypeScript files
const EXCEL_FILE_PATH = path.resolve('Menu.xlsx');
const OUTPUT_TS_PATH = path.resolve('src/data/menuData.ts');

/**
 * Helper function to format numeric prices into strings with two decimal places.
 * Example: 5 -> "5.00", 12.5 -> "12.50"
 * @param {number|string} price - Raw price value from Excel cell
 * @returns {string} Formatted price string
 */
const formatPrice = (price) => {
  if (price === undefined || price === null || price === '' || isNaN(price)) {
    return '-';
  }
  return Number(price).toFixed(2);
};

// Check if the Excel file exists before processing
if (!fs.existsSync(EXCEL_FILE_PATH)) {
  console.error(`[ERROR] Excel file not found at: ${EXCEL_FILE_PATH}`);
  process.exit(1);
}

console.log(`[INFO] Reading Excel workbook: ${EXCEL_FILE_PATH}...`);

// Read the workbook from filesystem
const fileBuffer = fs.readFileSync(EXCEL_FILE_PATH);
const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

// Get the first sheet name and access its data
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// Convert sheet data into an array of JavaScript objects
const rawRows = XLSX.utils.sheet_to_json(worksheet);

console.log(`[INFO] Successfully parsed ${rawRows.length} rows from sheet "${firstSheetName}".`);

// Arrays to hold categorized menu items
const pizzas = [];
const calzoni = [];

// Iterate through each row and structure data according to category
rawRows.forEach((row) => {
  const category = row.Category ? String(row.Category).trim() : 'Classiche';

  if (category === 'Calzoni') {
    // Structure item for Calzoni list
    calzoni.push({
      id: row.ID,
      name: row.Pizza_Name || '',
      ingredients: row.Ingredients || '',
      price: formatPrice(row.Price_Normale),
    });
  } else {
    // Structure item for Pizzas list (Classiche, Di Mare, Vegetariane e Formaggi, Le Speciali)
    pizzas.push({
      id: row.ID,
      name: row.Pizza_Name || '',
      ingredients: row.Ingredients || '',
      normale: formatPrice(row.Price_Normale),
      maxi: formatPrice(row.Price_Maxi),
      category: category,
    });
  }
});

// Static data for beverages (preserved from original layout)
const drinksData = [
  { name: 'Acqua Naturale',       vol: '50 cl',  price: '1.50' },
  { name: 'Acqua Frizzante',      vol: '50 cl',  price: '1.50' },
  { name: 'Acqua Minerale',       vol: '1 L',    price: '2.50' },
  { name: 'Coca-Cola',            vol: '33 cl',  price: '2.50' },
  { name: 'Fanta',                vol: '33 cl',  price: '2.50' },
  { name: 'Sprite',               vol: '33 cl',  price: '2.50' },
  { name: 'Birra Peroni',         vol: '33 cl',  price: '3.00' },
  { name: 'Birra Moretti',        vol: '33 cl',  price: '3.00' },
  { name: 'Birra artigianale',    vol: '50 cl',  price: '5.50' },
  { name: 'Vino rosso della casa',vol: '25 cl',  price: '4.00' },
  { name: 'Vino bianco della casa',vol: '25 cl', price: '4.00' },
  { name: 'Vino rosso della casa',vol: '75 cl',  price: '10.00' },
  { name: 'Prosecco DOC',         vol: '75 cl',  price: '14.00' },
  { name: 'Limoncello',           vol: '4 cl',   price: '3.00' },
  { name: 'Caffè espresso',                      price: '1.20' },
];

// Static data for desserts (preserved from original layout)
const dolciData = [
  { name: 'Tiramisù',           desc: 'Ricetta della casa con mascarpone e savoiardi',       price: '5.00' },
  { name: 'Babà al rum',        desc: 'Tradizionale napoletano, bagnato al rum invecchiato', price: '4.50' },
  { name: 'Sfogliatella',       desc: 'Riccia napoletana con ricotta e canditi',             price: '3.50' },
  { name: 'Panna cotta',        desc: 'Con coulis di frutti di bosco freschi',               price: '4.50' },
  { name: 'Gelato artigianale', desc: 'Due gusti a scelta tra sei proposte stagionali',      price: '4.00' },
  { name: 'Torta di ricotta',   desc: 'Con scorza di arancia e gocce di cioccolato',         price: '5.00' },
];

// Generate the TypeScript file content with proper type definitions and JSON payloads
const tsContent = `// AUTO-GENERATED FILE BY convert.mjs
// Do not edit directly; modify "Меню власне.xlsx" and run "npm run convert" instead.

export type Pizza = {
  id: number
  name: string
  ingredients: string
  normale: string
  maxi: string
  category: string
}

export type Calzone = {
  id: number | string
  name: string
  ingredients: string
  price: string
}

export type Drink = {
  name: string
  vol?: string
  price: string
}

export type Dolce = {
  name: string
  desc: string
  price: string
}

export const pizzas: Pizza[] = ${JSON.stringify(pizzas, null, 2)};

export const calzoni: Calzone[] = ${JSON.stringify(calzoni, null, 2)};

export const drinks: Drink[] = ${JSON.stringify(drinksData, null, 2)};

export const dolci: Dolce[] = ${JSON.stringify(dolciData, null, 2)};
`;

// Write generated content to destination file
fs.writeFileSync(OUTPUT_TS_PATH, tsContent, 'utf8');

console.log(`[SUCCESS] Successfully converted Excel data into: ${OUTPUT_TS_PATH}`);
console.log(`[SUMMARY] Pizzas processed: ${pizzas.length} | Calzoni processed: ${calzoni.length}`);