// Sistema de iconos para categorías
const CATEGORY_ICONS = {
  agricultura: '🌱',
  ganaderia: '🐄',
  maquinaria: '🚜',
  salarios: '👨‍🌾',
  impuestos: '🏛️',
  ventas: '💰',
  subvenciones: '📑',
  bancos: '🏦',
  otros: '❓'
};

function getIconForCategory(category) {
  return CATEGORY_ICONS[category.toLowerCase()] || CATEGORY_ICONS.otros;
}