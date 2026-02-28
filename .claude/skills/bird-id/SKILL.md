---
name: bird-id
description: Identify birds from field descriptions, sounds, and photos. Log sightings and track ecological roles.
---

# Bird Identification Workflow

When Lara describes a bird or shares a photo/sound description, follow this process:

## Step 1: Gather Details
Ask about any missing observations:
- **Size**: Relative to known birds (sparrow-sized, robin-sized, crow-sized, hawk-sized)
- **Plumage**: Colors, patterns, distinctive markings (eye rings, wing bars, breast spots)
- **Beak**: Shape (thin/thick, curved/straight, hooked), color
- **Call/Song**: Phonetic description, rhythm, pitch, quality (buzzy, clear, harsh, melodic)
- **Behavior**: Foraging method, flight pattern, social (flock/pair/solitary), ground vs. canopy
- **Habitat**: Where on property (creek, canopy, field edge, understory, near cabin)
- **Time**: Time of day, season, weather conditions
- **Movement**: Hopping/walking, climbing trunks, aerial hunting, ground foraging

## Step 2: Identify
- Cross-reference with PNW bird knowledge for White Salmon area (2220 ft, mixed conifer-deciduous)
- Consider seasonal presence (year-round resident, winter visitor, breeding migrant, passage migrant)
- Search the web if uncertain: use Cornell All About Birds, eBird, Audubon, Merlin
- Provide confidence level: confirmed, likely, or possible (with alternatives)
- If uncertain, narrow to family/group and suggest what to look/listen for to confirm

## Step 3: Document the Sighting
Once identified, share:
- **Common name** and **Scientific name**
- **Seasonal status**: Year-round resident / Winter visitor / Summer breeder / Migrant
- **Ecological role in food forest**:
  - Pest control (insectivores)
  - Pollination
  - Seed dispersal
  - Rodent control (raptors)
  - Indicator species (what their presence tells about habitat health)
- **Habitat indicator**: What this bird's presence says about the forest
- **Plants that support this species**: Nesting, food, cover
- **Conservation notes**: Any special status or population trends

## Step 4: Offer Next Steps
- "Want me to log this sighting?" → Write to `observations/2026/MM/YYYY-MM-DD.md`
- "Want me to add this to the species database?" → Update `database/species.json`
- "Want me to update the bird inventory?" → Update `observations/bird-inventory.md`

## Bird Inventory Format (observations/bird-inventory.md)
Maintain a running inventory:

```markdown
# Bird Inventory — 50 Acres, White Salmon WA

## Confirmed Species

| Species | Scientific Name | Status | First Seen | Habitat | Ecological Role |
|---------|----------------|--------|------------|---------|-----------------|
| Great Horned Owl | Bubo virginianus | Year-round | Jan 2026 | Cabin edge, canopy | Rodent control, apex predator |

## Suspected / Reported
| Species | Source | Notes |
|---------|--------|-------|
| Northern Harrier | Neighbor report | Pair, open fields |

## Seasonal Tracking
### Winter (Dec-Feb)
### Spring (Mar-May)
### Summer (Jun-Aug)
### Fall (Sep-Nov)
```

## Ecological Role Categories
- **Insectivore**: Controls pest insects (warblers, chickadees, nuthatches, woodpeckers, wrens)
- **Seed disperser**: Spreads native plants (thrushes, waxwings, jays)
- **Pollinator**: Visits flowers (hummingbirds)
- **Raptor/Predator**: Controls rodents and small mammals (owls, hawks, harriers)
- **Scavenger**: Nutrient cycling (crows, ravens)
- **Indicator**: Presence signals specific habitat quality (old growth, water quality, etc.)
