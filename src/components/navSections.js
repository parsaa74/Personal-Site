// src/components/navSections.js
export const navSections = [
  { id: 'blog', label: 'Blog' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'cv', label: 'CV' },
  { id: 'contact', label: 'Contact' }
];

// Add angles for TVirusBackground - distributed evenly around the circle
const T_VIRUS_ANGLES = navSections.map((_, index) => index * (360 / navSections.length));

export const navSectionsWithAngles = navSections.map((section, index) => ({
  ...section,
  angle: T_VIRUS_ANGLES[index] !== undefined ? T_VIRUS_ANGLES[index] : index * (360 / navSections.length),
}));
