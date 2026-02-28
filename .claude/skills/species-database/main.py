#!/usr/bin/env python3
"""
Species Database Management Skill

Manages the master species database at database/species.json.
Handles adding, updating, querying, and reporting on species observations.
"""

import json
import os
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional

# Path to the database
DB_PATH = Path("database/species.json")

def load_database() -> Dict[str, Any]:
    """Load the species database from disk."""
    if not DB_PATH.exists():
        return {
            "metadata": {
                "property": "50 acres, White Salmon, WA",
                "elevation": "2220 ft",
                "usdaZone": "7b/8a",
                "ecoregion": "Columbia River Gorge, Pacific Northwest temperate",
                "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
                "speciesCounts": {
                    "total": 0,
                    "plants": 0,
                    "birds": 0,
                    "mammals": 0,
                    "other": 0
                },
                "goals": {
                    "plantSpeciesTarget": 150,
                    "practicum": "OP 601 Food Forest Practicum - Spring 2026"
                }
            },
            "species": []
        }

    with open(DB_PATH, 'r') as f:
        return json.load(f)

def save_database(db: Dict[str, Any]):
    """Save the species database to disk with auto-updated metadata."""
    # Update lastUpdated timestamp
    db["metadata"]["lastUpdated"] = datetime.now().strftime("%Y-%m-%d")

    # Auto-calculate species counts
    counts = {
        "total": len(db["species"]),
        "plants": 0,
        "birds": 0,
        "mammals": 0,
        "other": 0
    }

    for species in db["species"]:
        species_type = species.get("type", "other")
        if species_type == "plant":
            counts["plants"] += 1
        elif species_type == "bird":
            counts["birds"] += 1
        elif species_type == "mammal":
            counts["mammals"] += 1
        else:
            counts["other"] += 1

    # Preserve existing goals but update counts
    if "speciesCounts" not in db["metadata"]:
        db["metadata"]["speciesCounts"] = {}
    if "goals" not in db["metadata"]:
        db["metadata"]["goals"] = {
            "plantSpeciesTarget": 150,
            "practicum": "OP 601 Food Forest Practicum - Spring 2026"
        }

    db["metadata"]["speciesCounts"] = counts

    # Write to disk
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(DB_PATH, 'w') as f:
        json.dump(db, f, indent=2)

def find_species(db: Dict[str, Any], identifier: str) -> Optional[Dict[str, Any]]:
    """Find a species by ID, common name, or scientific name (case-insensitive)."""
    identifier_lower = identifier.lower()
    for species in db["species"]:
        if (species.get("id", "").lower() == identifier_lower or
            species.get("commonName", "").lower() == identifier_lower or
            species.get("scientificName", "").lower() == identifier_lower):
            return species
    return None

def add_or_update_species(db: Dict[str, Any], species_data: Dict[str, Any]) -> str:
    """Add a new species or update an existing one."""
    identifier = species_data.get("id") or species_data.get("scientificName")
    if not identifier:
        return "Error: Species must have an 'id' or 'scientificName'"

    existing = find_species(db, identifier)

    if existing:
        # Update existing species
        for key, value in species_data.items():
            if key == "observations" and key in existing:
                # Append new observations
                existing["observations"].extend(value)
            elif key == "locations" and key in existing:
                # Merge locations
                existing["locations"] = list(set(existing["locations"] + value))
            else:
                # Update field
                existing[key] = value
        return f"Updated {existing.get('commonName', identifier)}"
    else:
        # Add new species
        db["species"].append(species_data)
        return f"Added {species_data.get('commonName', identifier)}"

def query_species(db: Dict[str, Any], **filters) -> List[Dict[str, Any]]:
    """
    Query species with various filters.

    Supported filters:
    - type: "plant", "bird", "mammal"
    - onProperty: True/False
    - nativeStatus: "native", "introduced"
    - foodForestLayer: "canopy", "understory", "shrub", "herbaceous", "ground cover", "vine", "root"
    - ecologicalFunction: string to match in ecologicalFunctions list
    - hasHumanUse: "food", "medicine", "fiber", "craft" (for plants)
    - abundance: "rare", "uncommon", "common", "abundant", "very abundant"
    - profileComplete: True/False
    """
    results = []

    for species in db["species"]:
        match = True

        # Check each filter
        for key, value in filters.items():
            if key == "ecologicalFunction":
                if "ecologicalFunctions" in species:
                    if value.lower() not in [f.lower() for f in species["ecologicalFunctions"]]:
                        match = False
                        break
            elif key == "hasHumanUse":
                if species.get("type") == "plant" and "humanUses" in species:
                    uses = species["humanUses"]
                    if value in uses and len(uses[value]) == 0:
                        match = False
                        break
                else:
                    match = False
                    break
            elif key == "abundance":
                if "abundance" in species:
                    if species["abundance"].get("density", "").lower() != value.lower():
                        match = False
                        break
                else:
                    match = False
                    break
            else:
                # Direct field match
                if species.get(key) != value:
                    match = False
                    break

        if match:
            results.append(species)

    return results

def generate_report(db: Dict[str, Any], report_type: str) -> str:
    """
    Generate various reports from the database.

    Report types:
    - summary: Overall counts and progress toward goals
    - plants_by_layer: Plants organized by food forest layer
    - medicinal: All plants with medicinal uses
    - edible: All plants with food uses
    - guild: Show guild relationships
    - needs_profiles: Species that need plant profiles created
    - harvest_calendar: When to harvest different plant parts
    - checklist_progress: Cross-reference with PNW edible species checklist
    """

    if report_type == "summary":
        metadata = db["metadata"]
        counts = metadata.get("speciesCounts", {})
        goals = metadata.get("goals", {})

        report = f"""# Species Database Summary

**Property:** {metadata.get('property')}
**Last Updated:** {metadata.get('lastUpdated')}

## Species Counts
- **Total Species:** {counts.get('total', 0)}
- **Plants:** {counts.get('plants', 0)} / {goals.get('plantSpeciesTarget', 150)} (Goal: {goals.get('plantSpeciesTarget', 150)})
- **Birds:** {counts.get('birds', 0)}
- **Mammals:** {counts.get('mammals', 0)}
- **Other:** {counts.get('other', 0)}

## Progress
- **Plant Species Progress:** {counts.get('plants', 0)}/{goals.get('plantSpeciesTarget', 150)} ({int(counts.get('plants', 0)/goals.get('plantSpeciesTarget', 150)*100)}%)
"""
        return report

    elif report_type == "plants_by_layer":
        plants = query_species(db, type="plant")
        layers = {}
        for plant in plants:
            layer = plant.get("foodForestLayer", "unknown")
            if layer not in layers:
                layers[layer] = []
            layers[layer].append(plant)

        report = "# Plants by Food Forest Layer\n\n"
        for layer in ["canopy", "understory", "shrub", "herbaceous", "ground cover", "vine", "root"]:
            if layer in layers:
                report += f"\n## {layer.title()}\n"
                for plant in layers[layer]:
                    abundance = plant.get("abundance", {}).get("density", "unknown")
                    report += f"- **{plant['commonName']}** (*{plant['scientificName']}*) - {abundance}\n"
        return report

    elif report_type == "medicinal":
        plants = query_species(db, type="plant")
        medicinal = [p for p in plants if "humanUses" in p and len(p["humanUses"].get("medicine", [])) > 0]

        report = "# Medicinal Plants\n\n"
        for plant in medicinal:
            report += f"\n## {plant['commonName']} (*{plant['scientificName']}*)\n"
            for use in plant["humanUses"]["medicine"]:
                report += f"- **Part:** {use['part']}\n"
                report += f"  - **Preparation:** {use['preparation']}\n"
                report += f"  - **Uses:** {use['uses']}\n"
                report += f"  - **Harvest:** {use['harvest']}\n"
                report += f"  - **Sustainable Yield:** {use['sustainableYield']}\n"
        return report

    elif report_type == "edible":
        plants = query_species(db, type="plant")
        edible = [p for p in plants if "humanUses" in p and len(p["humanUses"].get("food", [])) > 0]

        report = "# Edible Plants\n\n"
        for plant in edible:
            report += f"\n## {plant['commonName']} (*{plant['scientificName']}*)\n"
            abundance = plant.get("abundance", {}).get("estimate", "unknown")
            report += f"**Abundance:** {abundance}\n\n"
            for use in plant["humanUses"]["food"]:
                report += f"- **Part:** {use['part']}\n"
                report += f"  - **Preparation:** {use['preparation']}\n"
                report += f"  - **Flavor:** {use.get('flavor', 'N/A')}\n"
                report += f"  - **Harvest:** {use['harvest']}\n"
                report += f"  - **Sustainable Yield:** {use['sustainableYield']}\n"
        return report

    elif report_type == "harvest_calendar":
        plants = query_species(db, type="plant")
        calendar = {}

        for plant in plants:
            if "humanUses" not in plant:
                continue

            for use_type in ["food", "medicine", "fiber", "craft"]:
                for use in plant["humanUses"].get(use_type, []):
                    harvest = use.get("harvest", "").lower()
                    if harvest not in calendar:
                        calendar[harvest] = []
                    calendar[harvest].append({
                        "plant": plant["commonName"],
                        "part": use["part"],
                        "type": use_type,
                        "preparation": use.get("preparation", "")
                    })

        report = "# Harvest Calendar\n\n"
        for season in ["spring", "summer", "fall", "winter", "year-round"]:
            matches = {k: v for k, v in calendar.items() if season in k or (season == "year-round" and "year" in k)}
            if matches:
                report += f"\n## {season.title()}\n"
                for harvest_time, items in sorted(matches.items()):
                    report += f"\n### {harvest_time.title()}\n"
                    for item in items:
                        report += f"- **{item['plant']}** - {item['part']} ({item['type']}): {item['preparation']}\n"

        return report

    elif report_type == "needs_profiles":
        plants = query_species(db, type="plant", profileComplete=False)

        report = "# Plants Needing Profiles\n\n"
        for plant in plants:
            report += f"- [ ] **{plant['commonName']}** (*{plant['scientificName']}*)\n"
            report += f"  - Profile path: `{plant.get('profilePath', 'N/A')}`\n"
        return report

    elif report_type == "checklist_progress":
        # High-priority PNW edible species from checklist
        checklist_species = [
            "Oregon Grape", "Salal", "Red Huckleberry", "Salmonberry",
            "Thimbleberry", "Black Huckleberry", "Elderberry", "Wild Strawberry",
            "Blackberry", "Serviceberry", "Saskatoon Berry", "Hawthorn",
            "Wild Rose", "Stinging Nettle", "Camas", "Devil's Club",
            "Miner's Lettuce", "Dandelion", "Chickweed", "Violet",
            "Plantain", "Clover", "Fireweed", "Gooseberry", "Currant"
        ]

        plants = query_species(db, type="plant")
        plant_names = [p["commonName"].lower() for p in plants]

        confirmed = []
        missing = []

        for species in checklist_species:
            if any(species.lower() in name for name in plant_names):
                confirmed.append(species)
            else:
                missing.append(species)

        report = "# PNW Edible Species Checklist Progress\n\n"
        report += f"**Confirmed on Property:** {len(confirmed)}/{len(checklist_species)}\n\n"

        report += "## ✓ Confirmed in Database\n"
        for species in confirmed:
            report += f"- [x] {species}\n"

        report += "\n## ? Needs Field Verification\n"
        for species in missing:
            report += f"- [ ] {species}\n"

        return report

    else:
        return f"Unknown report type: {report_type}"

def main():
    """Main entry point for the species-database skill."""
    import sys

    if len(sys.argv) < 2:
        print("Usage:")
        print("  species-database query [filters]")
        print("  species-database report <type>")
        print("  species-database add <species_json>")
        print("  species-database show <species_name>")
        return

    command = sys.argv[1]
    db = load_database()

    if command == "query":
        # Parse filters from command line
        filters = {}
        for i in range(2, len(sys.argv), 2):
            if i + 1 < len(sys.argv):
                key = sys.argv[i].lstrip("--")
                value = sys.argv[i + 1]
                # Try to convert to bool
                if value.lower() == "true":
                    value = True
                elif value.lower() == "false":
                    value = False
                filters[key] = value

        results = query_species(db, **filters)
        print(f"Found {len(results)} species:\n")
        for species in results:
            print(f"- {species['commonName']} (*{species['scientificName']}*) - {species.get('type', 'unknown')}")

    elif command == "report":
        if len(sys.argv) < 3:
            print("Available reports: summary, plants_by_layer, medicinal, edible, harvest_calendar, needs_profiles")
            return

        report_type = sys.argv[2]
        print(generate_report(db, report_type))

    elif command == "show":
        if len(sys.argv) < 3:
            print("Usage: species-database show <species_name>")
            return

        identifier = " ".join(sys.argv[2:])
        species = find_species(db, identifier)

        if species:
            print(json.dumps(species, indent=2))
        else:
            print(f"Species not found: {identifier}")

    else:
        print(f"Unknown command: {command}")

if __name__ == "__main__":
    main()
