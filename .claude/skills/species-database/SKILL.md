---
name: species-database
description: Manage the master species database. Add, update, query species. Generate reports for practicum and design work.
---

# Species Database Workflow

The master species database lives at `database/species.json`. This is the single source of truth for all species observed on the property and design candidates.

## Database Schema

Each species entry follows this structure:

```json
{
  "species": [
    {
      "id": "oregon-grape",
      "commonName": "Oregon Grape",
      "scientificName": "Mahonia aquifolium",
      "type": "plant",
      "family": "Berberidaceae",
      "nativeStatus": "native",
      "foodForestLayer": "shrub",
      "status": "observed",
      "onProperty": true,
      "locations": ["creek corridor", "understory throughout"],
      "ecologicalFunctions": ["wildlife habitat", "pollinator attractor", "erosion control", "edible fruit"],
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
      "health": "thriving",
      "firstObserved": "2026-01",
      "observations": [
        "Abundant throughout property, especially understory"
      ],
      "practicumNotes": "",
      "profileComplete": false,
      "profilePath": "plant-profiles/oregon-grape.md"
    }
  ]
}
```

### For bird species, use this structure:

```json
{
  "id": "great-horned-owl",
  "commonName": "Great Horned Owl",
  "scientificName": "Bubo virginianus",
  "type": "bird",
  "family": "Strigidae",
  "nativeStatus": "native",
  "seasonalStatus": "year-round resident",
  "status": "confirmed",
  "onProperty": true,
  "locations": ["near main cabin", "canopy"],
  "ecologicalRole": ["rodent control", "apex predator"],
  "habitatIndicator": "Mature trees for nesting, healthy prey base (rabbits, squirrels, woodrats)",
  "supportingPlants": ["Douglas fir (nesting)", "open edges (hunting)"],
  "firstObserved": "2026-01",
  "observations": [
    "2026-01: Mated pair duet ~30 min at 9pm near main cabin"
  ]
}
```

## Operations

### Adding a Species
When a new species is identified (from walk, research, or design planning):
1. Read current `database/species.json`
2. Check if species already exists (by scientific name or common name)
3. If new, create entry with all available data
4. If exists, update with new observations
5. Write updated database back

### Querying
Respond to queries like:
- "What nitrogen fixers do I have?" → Filter by ecologicalFunctions
- "Show me shrub layer candidates" → Filter by foodForestLayer
- "What's on the property?" → Filter by onProperty: true
- "What needs profiles?" → Filter by profileComplete: false
- "How's the Oregon grape doing?" → Find by name, show observations and health
- "Build me a guild around hazelnut" → Find companions by guildRelationships and ecological niche

### Updating
When new observations come in:
- Update `observations` array with dated entry
- Update `health` if status changed
- Add new `locations` if found in new areas
- Update `phenology` with actual observed dates

### Reporting
Generate reports for:
- **Practicum design**: Species by layer, function, and placement
- **Planting lists**: What to acquire, grouped by season and priority
- **Guild maps**: Visual groupings of companion species
- **Gap analysis**: Which layers or functions are underrepresented
- **Seasonal calendar**: What's happening when across all species

## Important Notes
- Always read the current database before making changes
- Preserve all existing data when updating
- Use ISO dates (YYYY-MM-DD or YYYY-MM) for all date fields
- Keep observations chronological
- Flag any species health concerns prominently
