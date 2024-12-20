#!/bin/bash

# Create main directories
mkdir -p public/{images,videos}
mkdir -p src/{components,pages,styles,utils}
mkdir -p projects/{creative-coding,ux-ui-design,motion-graphics,filmmaking,performance-art,graphic-design}

# Create component files
touch src/components/{Header,Footer,ProjectCard,SkillBadge}.js

# Create page files
touch src/pages/{index,about,projects,contact}.js

# Create style files
touch src/styles/global.css

# Create utility files
touch src/utils/{data,analytics}.js

# Create main app file
touch src/app.js

# Create root files
touch .gitignore README.md

# Initialize package.json if it doesn't exist
if [ ! -f package.json ]; then
  npm init -y
fi 