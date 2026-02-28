---
name: plant-id
description: Identify plants from field descriptions and photos, create plant profiles, and log to species database.
---

# Plant Identification Workflow

When Lara describes a plant or shares a photo, follow this process:

## Step 1: Gather Details
Ask about any missing observations:
- **Leaf**: Shape, arrangement (opposite/alternate/whorled), margin (smooth/toothed/lobed), texture, size, evergreen or deciduous?
- **Bark**: Color, texture (smooth/furrowed/peeling/plated), any distinctive smell?
- **Height & Form**: Estimated height, growth habit (tree/shrub/groundcover/vine/herb), single trunk or multi-stemmed?
- **Flowers/Fruit/Seeds**: Color, shape, cluster type, season observed
- **Habitat**: Where on the property (creek, ridge, clearing, understory, edge), sun exposure, soil moisture
- **Season behavior**: Currently leafed out, dormant, blooming, fruiting?

## Step 2: Identify
- Cross-reference observations with PNW native plant knowledge
- Consider the elevation (2220 ft), aspect, and microclimate
- Search the web if uncertain: use Cornell, OSU Extension, USDA PLANTS database, or Burke Herbarium
- Provide confidence level: confident, likely, or possible (with alternatives)
- If uncertain, narrow to genus and suggest what to look for to confirm species

## Step 3: Document the ID
Once identified, share:
- **Common name** and **Scientific name**
- **Food forest layer**: canopy, understory, shrub, herbaceous, ground cover, vine, root/rhizosphere
- **Ecological functions**: nitrogen fixer, dynamic accumulator, pollinator attractor, pest confuser, wildlife habitat, erosion control, etc.
- **Native status**: Native to PNW / Native to region / Naturalized / Introduced
- **Guild relationships**: What other species on the property pair well with this plant?
- **Wildlife value**: What birds, insects, or animals does it support?

## Step 4: Offer Next Steps
- "Want me to create a plant profile for [species]?" → Write to `plant-profiles/[species-name].md`
- "Want me to add this to the species database?" → Update `database/species.json`
- "Want me to log this observation?" → Write to `observations/2026/MM/YYYY-MM-DD.md`

## Plant Profile Template
When creating a plant profile, use this structure:

```markdown
# [Common Name] (*Scientific Name*)

## Overview
- **Family**:
- **Food Forest Layer**:
- **Native Range**:
- **USDA Zones**:

## Identification
- **Leaves**:
- **Bark**:
- **Flowers**:
- **Fruit/Seeds**:
- **Height/Spread**:
- **Growth Rate**:

## Ecological Functions
- [ ] Nitrogen fixer
- [ ] Dynamic accumulator
- [ ] Pollinator attractor
- [ ] Pest confuser
- [ ] Wildlife habitat
- [ ] Erosion control
- [ ] Windbreak
- [ ] Other:

## Wildlife Value
- **Birds**:
- **Pollinators**:
- **Other wildlife**:

## Growing Conditions
- **Sun**:
- **Water**:
- **Soil**:
- **Propagation**:

## Guild Relationships
- **Companions**:
- **Avoid**:

## On the Property
- **Locations observed**:
- **Health/Status**:
- **First documented**:
- **Notes**:

## Practicum Notes
- **Niche analysis role**:
- **Design placement ideas**:
```
