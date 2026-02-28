# Species Database Schema

## Current Structure
The species database (`database/species.json`) tracks all observed species on the property - birds, mammals, plants, fungi, etc.

## Plant Species Tracking Enhancement

### New Fields Needed for Plants

#### 1. Abundance Tracking (`abundance`)
Rough quantification to enable sustainable harvest calculations (Peters methodology).

```json
"abundance": {
  "category": "abundant",  // rare | uncommon | common | abundant | dominant
  "estimatedCount": "500+",  // rough count or range
  "distribution": "throughout property",
  "lastCounted": "2026-02",
  "notes": "Dense patches in understory, regenerating well"
}
```

**Categories:**
- `rare`: 1-5 individuals
- `uncommon`: 5-20 individuals
- `common`: 20-100 individuals
- `abundant`: 100-500 individuals
- `dominant`: 500+ individuals or forms extensive patches

#### 2. Structured Uses (`humanUses`)
Categorized uses with harvest timing and methods.

```json
"humanUses": {
  "food": {
    "parts": ["berries", "young shoots"],
    "harvestWindow": "July-September for berries, April for shoots",
    "harvestMethod": "Pick ripe berries, leave 30% for wildlife. Cut shoots at base.",
    "preparation": "Berries: jelly, juice, wine. Shoots: steamed or pickled.",
    "yield": "~2 cups berries per mature plant",
    "sustainableHarvestRate": "30% of berry crop",
    "notes": "Very tart, high in vitamin C"
  },
  "medicine": {
    "parts": ["root bark"],
    "harvestWindow": "Late fall after first frost, or early spring before leaf-out",
    "harvestMethod": "Harvest from plants 5+ years old. Take max 1/3 of lateral roots, never taproot.",
    "preparation": "Tincture, decoction, salve",
    "activeCompounds": "berberine (antimicrobial, anti-inflammatory)",
    "sustainableHarvestRate": "Max 10% of mature plants annually",
    "notes": "Powerful medicine - respect the plant"
  },
  "fiber": null,
  "basketry": {
    "parts": ["flexible young stems", "roots"],
    "harvestWindow": "Spring for stems, fall for roots",
    "harvestMethod": "Coppice or selective pruning",
    "preparation": "Strip bark, dry, soak before weaving",
    "notes": "Traditional practice"
  },
  "dye": {
    "parts": ["inner bark", "roots"],
    "color": "yellow to gold",
    "mordant": "alum",
    "harvestWindow": "Fall",
    "notes": "Same material as medicinal harvest"
  },
  "craft": null,
  "timber": null,
  "fodder": null,
  "other": []
}
```

**Standard Use Categories:**
- `food`: Human edible parts
- `medicine`: Medicinal preparations
- `fiber`: Cordage, textiles, paper
- `basketry`: Weaving materials
- `dye`: Natural dyes
- `craft`: Carving, tools, musical instruments
- `timber`: Construction, furniture
- `fodder`: Animal feed
- `other`: Miscellaneous uses (array of strings)

Each category (except `other`) can be:
- `null` if not applicable
- An object with detailed harvest information if applicable

**Required fields for active use categories:**
- `parts`: Array of plant parts used
- `harvestWindow`: When to harvest (season, month, phenological stage)
- `harvestMethod`: How to harvest sustainably
- `sustainableHarvestRate`: Percentage or amount that can be taken without harming population

**Optional fields:**
- `preparation`: How to prepare/process
- `yield`: Expected yield per plant/area
- `notes`: Additional context

#### 3. Plant Species Counter
Separate tracking of plant species toward the 150-species polyculture goal.

Add to metadata:
```json
"metadata": {
  "property": "50 acres, White Salmon, WA",
  "elevation": "2220 ft",
  "usdaZone": "7b/8a",
  "ecoregion": "Columbia River Gorge, Pacific Northwest temperate",
  "lastUpdated": "2026-02-28",
  "speciesCounts": {
    "plants": 4,
    "birds": 9,
    "mammals": 1,
    "fungi": 0,
    "total": 14,
    "plantGoal": 150,
    "progressToGoal": "2.7%"
  }
}
```

## Migration Strategy

### Phase 1: Add New Fields to Existing Plants
Update Oregon Grape, Sword Fern, Grand Fir, Douglas Fir with:
- `abundance` object
- Enhanced `humanUses` object (replacing simple `uses` array)

### Phase 2: Update Species Database Skill
Modify `/species-database` skill to:
- Auto-calculate species counts by type
- Track progress toward 150-plant goal
- Query/report by use category
- Calculate sustainable harvest quantities

### Phase 3: New Queries
Enable queries like:
- "What medicinal plants do we have?"
- "Which plants can I harvest berries from in July?"
- "How much Oregon Grape root can I sustainably harvest?"
- "What's our current plant species count vs. 150-species goal?"
- "Which plants have basketry uses?"
- "Show all abundant species with food uses"

## Example: Fully Enhanced Plant Entry

```json
{
  "id": "oregon-grape-tall",
  "commonName": "Tall Oregon Grape",
  "scientificName": "Mahonia aquifolium",
  "type": "plant",
  "family": "Berberidaceae",
  "nativeStatus": "native",
  "foodForestLayer": "shrub",
  "status": "confirmed",
  "onProperty": true,

  "abundance": {
    "category": "abundant",
    "estimatedCount": "500+",
    "distribution": "throughout property, dense understory patches",
    "lastCounted": "2026-02",
    "notes": "Regenerating well, healthy population"
  },

  "locations": ["throughout property, abundant"],
  "ecologicalFunctions": ["wildlife habitat", "pollinator attractor", "erosion control", "edible fruit", "medicinal"],
  "guildRelationships": ["sword fern", "salal", "red huckleberry", "Douglas fir"],

  "wildlifeValue": {
    "birds": ["robins", "waxwings", "band-tailed pigeons"],
    "pollinators": ["native bees", "hummingbirds"],
    "mammals": []
  },

  "growingConditions": {
    "sun": "part shade to full sun",
    "water": "moderate, drought tolerant once established",
    "soil": "adaptable, well-drained",
    "zones": "5-9"
  },

  "phenology": {
    "bloom": "March-April",
    "fruit": "July-September",
    "leafOut": "evergreen",
    "dormancy": "evergreen"
  },

  "humanUses": {
    "food": {
      "parts": ["berries"],
      "harvestWindow": "July-September when deep blue and slightly soft",
      "harvestMethod": "Pick ripe clusters, leave 30% for wildlife",
      "preparation": "Jelly, juice, wine. High pectin content. Very tart - blend with sweeter fruits.",
      "yield": "~2 cups per mature shrub",
      "sustainableHarvestRate": "30-50% of berry crop",
      "notes": "High in vitamin C, antioxidants. Best after frost."
    },
    "medicine": {
      "parts": ["root bark", "stem bark"],
      "harvestWindow": "Late fall (Oct-Nov) or early spring (Mar) when sap is down",
      "harvestMethod": "Harvest from mature plants (5+ years). Take lateral roots only, max 1/3. Strip bark from pruned stems rather than main roots when possible.",
      "preparation": "Tincture (1:5, 50% alcohol), decoction, powder. External: salve for skin infections.",
      "activeCompounds": "Berberine (antimicrobial, anti-inflammatory), berbamine (immune support)",
      "sustainableHarvestRate": "Max 5-10% of mature plants annually. Rotate harvest areas every 3-5 years.",
      "notes": "Powerful antimicrobial. Avoid during pregnancy. Overharvest is a concern - cultivate before wild harvest."
    },
    "fiber": null,
    "basketry": null,
    "dye": {
      "parts": ["inner root bark", "stem bark"],
      "color": "bright yellow to gold",
      "mordant": "alum for brightness, iron for olive",
      "harvestWindow": "Same as medicinal harvest",
      "harvestMethod": "Use bark from pruned stems or medicinal root harvest",
      "notes": "High berberine content = excellent dye. Coordinate with medicinal harvest."
    },
    "craft": null,
    "timber": null,
    "fodder": null,
    "other": ["Ornamental evergreen for landscaping", "Ritual use - state flower of Oregon"]
  },

  "propagation": ["rhizome division (90% success)", "semi-hardwood cuttings Aug-Sep (50-70%)", "seed (20-40%, slow)"],

  "health": "thriving",
  "firstObserved": "2026-01",
  "observations": [
    "2026-01: Abundant throughout property. Lara interested in propagation - rhizome division recommended for late Oct-Nov or Mar-Apr.",
    "2026-02: Population estimated at 500+ plants. Dense patches in understory suitable for sustainable harvest."
  ],

  "practicumNotes": "Week 1: Shrub layer example. Demonstrates food/medicine/dye multi-functionality.",
  "profileComplete": true,
  "profilePath": "plant-profiles/oregon-grape.md"
}
```

## Profile Generation Fields (for Beautiful Plant Profiles)

### Additional Fields for Static Profile Pages

For generating beautiful,printable plant profile pages (practicum documentation), plants need these enriched fields:

```json
{
  "etymology": "Named for Bernard M'Mahon, Irish-American horticulturist. 'Aquifolium' means holly-leaved.",
  "commonNames": "Oregon Grape, Holly-leaved Barberry, Mountain Grape",
  "nativeRange": "Pacific Northwest, British Columbia to Northern California",

  "form": {
    "type": "Evergreen shrub",
    "height": "3-6 ft",
    "spread": "3-5 ft",
    "growth": "Moderate",
    "lifespan": "30+ years",
    "roots": "Shallow, spreading rhizomes"
  },

  "growingConditions": {
    "sun": "Part shade to full sun",
    "water": "Moderate — drought tolerant once established",
    "soil": "Adaptable — well-drained, tolerates poor soil",
    "zones": "5-9",
    "tolerance": "Drought, shade, deer resistant",
    "pests": "Generally pest-free. Possible rust, leaf spot."
  },

  "phenology": {
    "leafOut": "Evergreen",
    "bloom": "March-April · bright yellow racemes · fragrant · pollinated by early bees",
    "fruit": "July-September · blue-purple berries with waxy bloom",
    "dormancy": "Evergreen"
  },

  "humanUses": {
    "food": [...],
    "medicine": [...],
    "cultural": "Used by Coast Salish peoples for food and medicine..."
  },

  "nurseries": "Raintree Nursery, One Green World, local native plant sales",
  "propertyNotes": "Thriving in understory throughout 50 acres. Excellent guild candidate...",

  "bibliography": [
    "Natural Capital Plant Database — Mahonia aquifolium",
    "Plants for a Future — pfaf.org",
    "USDA PLANTS Database",
    "Medicinal Plants of the Pacific West — Michael Moore (2011)",
    "Native American Ethnobotany — Daniel Moerman (1998)"
  ],

  "profileDate": "2026-03",
  "weekNumber": 1,
  "profileComplete": true
}
```

### Profile-Specific Field Descriptions

**etymology** (string): Word origin and naming history. Makes the profile more engaging and educational.

**commonNames** (string): Comma-separated list of alternative common names.

**nativeRange** (string): Geographic native range for this species.

**form** (object): Detailed morphological data:
- `type`: Growth form (evergreen shrub, deciduous tree, etc.)
- `height`: Mature height range
- `spread`: Mature spread/width
- `growth`: Growth rate (fast, moderate, slow)
- `lifespan`: Expected lifespan
- `roots`: Root system description (shallow, deep, spreading, etc.)

**growingConditions.tolerance** (string): Environmental tolerances (drought, shade, wind, deer, etc.)

**growingConditions.pests** (string): Common pests and diseases, resistance notes.

**phenology** (object): Enhanced with descriptive detail:
- Each field can include detailed description after the timing
- Example: `"bloom": "March-April · bright yellow racemes · fragrant · pollinated by early bees"`

**humanUses.cultural** (string): Indigenous and cultural uses, traditional knowledge (with proper attribution and respect).

**nurseries** (string): Where to source this plant (nurseries, propagation methods, local sources).

**propertyNotes** (string): Specific observations and recommendations for this plant on Lara's 50 acres. Connects database to actual land.

**bibliography** (array of strings): Sources used to compile profile. Essential for practicum academic integrity. Use format: "Source Name — URL or Author (Year)".

**profileDate** (string): When profile was completed (YYYY-MM format).

**weekNumber** (integer): Which practicum week this profile was completed (for collection organization).

**profileComplete** (boolean): Whether this profile has all fields filled and is ready for static generation.

## Static Profile Page Generation

Profiles with `profileComplete: true` are ready to be rendered as beautiful, printable pages for the practicum portfolio. The static generator reads `species.json` and creates individual HTML pages for each completed profile.

**Build command:** `npm run build:profiles`

**Output:** `/profiles/[species-id].html` with heirloom botanical guide aesthetic.

## Future Considerations

### Harvest Tracking
Eventually add actual harvest records:
```json
"harvestLog": [
  {
    "date": "2026-09-15",
    "part": "berries",
    "quantity": "5 cups",
    "location": "understory patch near cabin",
    "notes": "First harvest. Left plenty for birds."
  }
]
```

### Supply & Demand Analysis
Track what Lara needs vs. what the land provides:
```json
"demand": {
  "medicinalHerbs": "high - building apothecary",
  "berries": "medium - preserving",
  "basketryMaterials": "low - occasional projects"
}
```

This enables Peters-style sustainable yield calculations.
