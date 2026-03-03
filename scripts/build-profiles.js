#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Simple JSX transformer (for Node.js without full build setup)
// We'll keep components simple to avoid needing a full transpiler

console.log('🌿 Building plant profiles...\n');

// Read species database
const speciesPath = join(projectRoot, 'database/species.json');
const speciesData = JSON.parse(readFileSync(speciesPath, 'utf-8'));

// Filter for complete plant profiles
const completePlants = speciesData.species.filter(
  species => species.type === 'plant' && species.profileComplete === true
);

console.log(`Found ${completePlants.length} complete plant profile(s):\n`);

// Ensure profiles directory exists
const profilesDir = join(projectRoot, 'profiles');
mkdirSync(profilesDir, { recursive: true });

// Read CSS
const cssPath = join(projectRoot, 'src/styles/plant-profile.css');
const cssContent = readFileSync(cssPath, 'utf-8');

// Build each profile
for (const plant of completePlants) {
  console.log(`  → ${plant.commonName} (${plant.scientificName})`);

  // Create HTML template
  const html = createProfileHTML(plant, cssContent);

  // Write to file
  const filename = `${plant.id}.html`;
  const filepath = join(profilesDir, filename);
  writeFileSync(filepath, html, 'utf-8');

  console.log(`    ✓ Generated: profiles/${filename}`);
}

console.log(`\n✨ Done! Generated ${completePlants.length} profile(s) in /profiles/\n`);

// HTML template generator
function createProfileHTML(plant, css) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${plant.commonName} · ${plant.scientificName}</title>
  <style>
${css}
  </style>
</head>
<body>
  <div class="plant-profile">
    ${renderProfileContent(plant)}
  </div>
</body>
</html>`;
}

// Profile content renderer
function renderProfileContent(plant) {
  let html = '';

  // Header
  html += `
    <div class="profile-header">
      <h1 class="common-name">${plant.commonName}</h1>
      <p class="scientific-name">${plant.scientificName}</p>
      <p class="family">${plant.family}</p>
    </div>
  `;

  // Etymology
  if (plant.etymology) {
    html += `
    <section class="section">
      <h2>Etymology</h2>
      <p class="etymology">${plant.etymology}</p>
    </section>
    `;
  }

  // Common Names & Native Range
  if (plant.commonNames) {
    html += `
    <section class="section meta-info">
      <div class="meta-row">
        <span class="meta-label">Also known as:</span>
        <span class="meta-value">${plant.commonNames}</span>
      </div>
    `;
    if (plant.nativeRange) {
      html += `
      <div class="meta-row">
        <span class="meta-label">Native range:</span>
        <span class="meta-value">${plant.nativeRange}</span>
      </div>
      `;
    }
    html += `</section>`;
  }

  // Form
  if (plant.form) {
    html += `
    <section class="section">
      <h2>Form</h2>
      <div class="form-grid">
        <div class="form-item">
          <span class="form-label">Type:</span>
          <span class="form-value">${plant.form.type}</span>
        </div>
        <div class="form-item">
          <span class="form-label">Height:</span>
          <span class="form-value">${plant.form.height}</span>
        </div>
        <div class="form-item">
          <span class="form-label">Spread:</span>
          <span class="form-value">${plant.form.spread}</span>
        </div>
        <div class="form-item">
          <span class="form-label">Growth:</span>
          <span class="form-value">${plant.form.growth}</span>
        </div>
        <div class="form-item">
          <span class="form-label">Lifespan:</span>
          <span class="form-value">${plant.form.lifespan}</span>
        </div>
        <div class="form-item">
          <span class="form-label">Roots:</span>
          <span class="form-value">${plant.form.roots}</span>
        </div>
      </div>
    </section>
    `;
  }

  // Growing Conditions
  if (plant.growingConditions) {
    html += `
    <section class="section">
      <h2>Growing Conditions</h2>
      <div class="conditions-grid">
        <div class="condition-item">
          <span class="condition-label">Sun:</span>
          <span class="condition-value">${plant.growingConditions.sun}</span>
        </div>
        <div class="condition-item">
          <span class="condition-label">Water:</span>
          <span class="condition-value">${plant.growingConditions.water}</span>
        </div>
        <div class="condition-item">
          <span class="condition-label">Soil:</span>
          <span class="condition-value">${plant.growingConditions.soil}</span>
        </div>
        <div class="condition-item">
          <span class="condition-label">Zones:</span>
          <span class="condition-value">${plant.growingConditions.zones}</span>
        </div>
    `;
    if (plant.growingConditions.tolerance) {
      html += `
        <div class="condition-item">
          <span class="condition-label">Tolerance:</span>
          <span class="condition-value">${plant.growingConditions.tolerance}</span>
        </div>
      `;
    }
    if (plant.growingConditions.pests) {
      html += `
        <div class="condition-item">
          <span class="condition-label">Pests:</span>
          <span class="condition-value">${plant.growingConditions.pests}</span>
        </div>
      `;
    }
    html += `
      </div>
    </section>
    `;
  }

  // Phenology
  if (plant.phenology) {
    html += `
    <section class="section">
      <h2>Phenology</h2>
      <div class="phenology-timeline">
        <div class="phenology-item">
          <span class="phenology-label">Leaf out:</span>
          <span class="phenology-value">${plant.phenology.leafOut}</span>
        </div>
        <div class="phenology-item">
          <span class="phenology-label">Bloom:</span>
          <span class="phenology-value">${plant.phenology.bloom}</span>
        </div>
        <div class="phenology-item">
          <span class="phenology-label">Fruit:</span>
          <span class="phenology-value">${plant.phenology.fruit}</span>
        </div>
        <div class="phenology-item">
          <span class="phenology-label">Dormancy:</span>
          <span class="phenology-value">${plant.phenology.dormancy}</span>
        </div>
      </div>
    </section>
    `;
  }

  // Human Uses
  if (plant.humanUses) {
    html += `<section class="section"><h2>Human Uses</h2>`;

    // Food
    if (plant.humanUses.food && plant.humanUses.food.length > 0) {
      html += `<div class="use-category"><h3>Food</h3>`;
      plant.humanUses.food.forEach(use => {
        html += `
        <div class="use-detail">
          <p><strong>Part:</strong> ${use.part}</p>
          <p><strong>Preparation:</strong> ${use.preparation}</p>
        `;
        if (use.flavor) html += `<p><strong>Flavor:</strong> ${use.flavor}</p>`;
        html += `
          <p><strong>Harvest:</strong> ${use.harvest}</p>
          <p><strong>Sustainable yield:</strong> ${use.sustainableYield}</p>
        `;
        if (use.notes) html += `<p class="use-notes">${use.notes}</p>`;
        html += `</div>`;
      });
      html += `</div>`;
    }

    // Medicine
    if (plant.humanUses.medicine && plant.humanUses.medicine.length > 0) {
      html += `<div class="use-category"><h3>Medicine</h3>`;
      plant.humanUses.medicine.forEach(use => {
        html += `
        <div class="use-detail">
          <p><strong>Part:</strong> ${use.part}</p>
          <p><strong>Preparation:</strong> ${use.preparation}</p>
          <p><strong>Uses:</strong> ${use.uses}</p>
          <p><strong>Harvest:</strong> ${use.harvest}</p>
          <p><strong>Sustainable yield:</strong> ${use.sustainableYield}</p>
        `;
        if (use.notes) html += `<p class="use-notes">${use.notes}</p>`;
        html += `</div>`;
      });
      html += `</div>`;
    }

    // Craft
    if (plant.humanUses.craft && plant.humanUses.craft.length > 0) {
      html += `<div class="use-category"><h3>Craft</h3>`;
      plant.humanUses.craft.forEach(use => {
        html += `
        <div class="use-detail">
          <p><strong>Part:</strong> ${use.part}</p>
          <p><strong>Preparation:</strong> ${use.preparation}</p>
        `;
        if (use.product) html += `<p><strong>Product:</strong> ${use.product}</p>`;
        html += `
          <p><strong>Harvest:</strong> ${use.harvest}</p>
          <p><strong>Sustainable yield:</strong> ${use.sustainableYield}</p>
        </div>`;
      });
      html += `</div>`;
    }

    // Cultural
    if (plant.humanUses.cultural) {
      html += `
      <div class="use-category">
        <h3>Cultural & Traditional Use</h3>
        <p class="cultural-note">${plant.humanUses.cultural}</p>
      </div>
      `;
    }

    // Other
    if (plant.humanUses.other && plant.humanUses.other.length > 0) {
      html += `<div class="use-category"><h3>Other Uses</h3><ul>`;
      plant.humanUses.other.forEach(use => {
        html += `<li>${use}</li>`;
      });
      html += `</ul></div>`;
    }

    html += `</section>`;
  }

  // Propagation
  if (plant.propagation && plant.propagation.length > 0) {
    html += `
    <section class="section">
      <h2>Propagation</h2>
      <ul class="propagation-list">
    `;
    plant.propagation.forEach(method => {
      html += `<li>${method}</li>`;
    });
    html += `</ul></section>`;
  }

  // Nurseries
  if (plant.nurseries) {
    html += `
    <section class="section">
      <h2>Where to Source</h2>
      <p>${plant.nurseries}</p>
    </section>
    `;
  }

  // Property Notes
  if (plant.propertyNotes) {
    html += `
    <section class="section property-notes">
      <h2>On the 50 Acres</h2>
      <p>${plant.propertyNotes}</p>
    </section>
    `;
  }

  // Bibliography
  if (plant.bibliography && plant.bibliography.length > 0) {
    html += `
    <section class="section bibliography">
      <h2>Sources</h2>
      <ul>
    `;
    plant.bibliography.forEach(source => {
      html += `<li>${source}</li>`;
    });
    html += `</ul></section>`;
  }

  // Footer
  if (plant.weekNumber && plant.profileDate) {
    html += `
    <footer class="profile-footer">
      <p>Week ${plant.weekNumber} · ${plant.profileDate} · Food Forest Practicum</p>
    </footer>
    `;
  }

  return html;
}
