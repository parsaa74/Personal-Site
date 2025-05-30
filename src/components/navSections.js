// src/components/navSections.js
export const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'contact', label: 'Contact' }
];

// Add angles for TVirusBackground - distributed evenly around the circle
const T_VIRUS_ANGLES = [0, 72, 144, 216, 288]; // 5 sections, 72 degrees apart

export const navSectionsWithAngles = navSections.map((section, index) => ({
  ...section,
  angle: T_VIRUS_ANGLES[index] !== undefined ? T_VIRUS_ANGLES[index] : index * (360 / navSections.length),
})); 