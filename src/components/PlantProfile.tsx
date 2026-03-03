import React from 'react';

interface FormData {
  type: string;
  height: string;
  spread: string;
  growth: string;
  lifespan: string;
  roots: string;
}

interface HumanUse {
  part: string;
  preparation: string;
  flavor?: string;
  harvest: string;
  sustainableYield: string;
  notes?: string;
  uses?: string;
  product?: string;
}

interface HumanUses {
  food?: HumanUse[];
  medicine?: HumanUse[];
  craft?: HumanUse[];
  cultural?: string;
  other?: string[];
}

interface GrowingConditions {
  sun: string;
  water: string;
  soil: string;
  zones: string;
  tolerance?: string;
  pests?: string;
}

interface Phenology {
  leafOut: string;
  bloom: string;
  fruit: string;
  dormancy: string;
}

interface PlantData {
  commonName: string;
  scientificName: string;
  family: string;
  etymology?: string;
  commonNames?: string;
  nativeRange?: string;
  form?: FormData;
  growingConditions: GrowingConditions;
  phenology: Phenology;
  humanUses: HumanUses;
  propagation?: string[];
  nurseries?: string;
  propertyNotes?: string;
  bibliography?: string[];
  weekNumber?: number;
  profileDate?: string;
}

interface PlantProfileProps {
  plant: PlantData;
}

const PlantProfile: React.FC<PlantProfileProps> = ({ plant }) => {
  return (
    <div className="plant-profile">
      {/* Header */}
      <div className="profile-header">
        <h1 className="common-name">{plant.commonName}</h1>
        <p className="scientific-name">{plant.scientificName}</p>
        <p className="family">{plant.family}</p>
      </div>

      {/* Etymology */}
      {plant.etymology && (
        <section className="section">
          <h2>Etymology</h2>
          <p className="etymology">{plant.etymology}</p>
        </section>
      )}

      {/* Common Names */}
      {plant.commonNames && (
        <section className="section meta-info">
          <div className="meta-row">
            <span className="meta-label">Also known as:</span>
            <span className="meta-value">{plant.commonNames}</span>
          </div>
          {plant.nativeRange && (
            <div className="meta-row">
              <span className="meta-label">Native range:</span>
              <span className="meta-value">{plant.nativeRange}</span>
            </div>
          )}
        </section>
      )}

      {/* Form */}
      {plant.form && (
        <section className="section">
          <h2>Form</h2>
          <div className="form-grid">
            <div className="form-item">
              <span className="form-label">Type:</span>
              <span className="form-value">{plant.form.type}</span>
            </div>
            <div className="form-item">
              <span className="form-label">Height:</span>
              <span className="form-value">{plant.form.height}</span>
            </div>
            <div className="form-item">
              <span className="form-label">Spread:</span>
              <span className="form-value">{plant.form.spread}</span>
            </div>
            <div className="form-item">
              <span className="form-label">Growth:</span>
              <span className="form-value">{plant.form.growth}</span>
            </div>
            <div className="form-item">
              <span className="form-label">Lifespan:</span>
              <span className="form-value">{plant.form.lifespan}</span>
            </div>
            <div className="form-item">
              <span className="form-label">Roots:</span>
              <span className="form-value">{plant.form.roots}</span>
            </div>
          </div>
        </section>
      )}

      {/* Growing Conditions */}
      <section className="section">
        <h2>Growing Conditions</h2>
        <div className="conditions-grid">
          <div className="condition-item">
            <span className="condition-label">Sun:</span>
            <span className="condition-value">{plant.growingConditions.sun}</span>
          </div>
          <div className="condition-item">
            <span className="condition-label">Water:</span>
            <span className="condition-value">{plant.growingConditions.water}</span>
          </div>
          <div className="condition-item">
            <span className="condition-label">Soil:</span>
            <span className="condition-value">{plant.growingConditions.soil}</span>
          </div>
          <div className="condition-item">
            <span className="condition-label">Zones:</span>
            <span className="condition-value">{plant.growingConditions.zones}</span>
          </div>
          {plant.growingConditions.tolerance && (
            <div className="condition-item">
              <span className="condition-label">Tolerance:</span>
              <span className="condition-value">{plant.growingConditions.tolerance}</span>
            </div>
          )}
          {plant.growingConditions.pests && (
            <div className="condition-item">
              <span className="condition-label">Pests:</span>
              <span className="condition-value">{plant.growingConditions.pests}</span>
            </div>
          )}
        </div>
      </section>

      {/* Phenology */}
      <section className="section">
        <h2>Phenology</h2>
        <div className="phenology-timeline">
          <div className="phenology-item">
            <span className="phenology-label">Leaf out:</span>
            <span className="phenology-value">{plant.phenology.leafOut}</span>
          </div>
          <div className="phenology-item">
            <span className="phenology-label">Bloom:</span>
            <span className="phenology-value">{plant.phenology.bloom}</span>
          </div>
          <div className="phenology-item">
            <span className="phenology-label">Fruit:</span>
            <span className="phenology-value">{plant.phenology.fruit}</span>
          </div>
          <div className="phenology-item">
            <span className="phenology-label">Dormancy:</span>
            <span className="phenology-value">{plant.phenology.dormancy}</span>
          </div>
        </div>
      </section>

      {/* Human Uses */}
      <section className="section">
        <h2>Human Uses</h2>

        {plant.humanUses.food && plant.humanUses.food.length > 0 && (
          <div className="use-category">
            <h3>Food</h3>
            {plant.humanUses.food.map((use, i) => (
              <div key={i} className="use-detail">
                <p><strong>Part:</strong> {use.part}</p>
                <p><strong>Preparation:</strong> {use.preparation}</p>
                {use.flavor && <p><strong>Flavor:</strong> {use.flavor}</p>}
                <p><strong>Harvest:</strong> {use.harvest}</p>
                <p><strong>Sustainable yield:</strong> {use.sustainableYield}</p>
                {use.notes && <p className="use-notes">{use.notes}</p>}
              </div>
            ))}
          </div>
        )}

        {plant.humanUses.medicine && plant.humanUses.medicine.length > 0 && (
          <div className="use-category">
            <h3>Medicine</h3>
            {plant.humanUses.medicine.map((use, i) => (
              <div key={i} className="use-detail">
                <p><strong>Part:</strong> {use.part}</p>
                <p><strong>Preparation:</strong> {use.preparation}</p>
                <p><strong>Uses:</strong> {use.uses}</p>
                <p><strong>Harvest:</strong> {use.harvest}</p>
                <p><strong>Sustainable yield:</strong> {use.sustainableYield}</p>
                {use.notes && <p className="use-notes">{use.notes}</p>}
              </div>
            ))}
          </div>
        )}

        {plant.humanUses.craft && plant.humanUses.craft.length > 0 && (
          <div className="use-category">
            <h3>Craft</h3>
            {plant.humanUses.craft.map((use, i) => (
              <div key={i} className="use-detail">
                <p><strong>Part:</strong> {use.part}</p>
                <p><strong>Preparation:</strong> {use.preparation}</p>
                {use.product && <p><strong>Product:</strong> {use.product}</p>}
                <p><strong>Harvest:</strong> {use.harvest}</p>
                <p><strong>Sustainable yield:</strong> {use.sustainableYield}</p>
              </div>
            ))}
          </div>
        )}

        {plant.humanUses.cultural && (
          <div className="use-category">
            <h3>Cultural & Traditional Use</h3>
            <p className="cultural-note">{plant.humanUses.cultural}</p>
          </div>
        )}

        {plant.humanUses.other && plant.humanUses.other.length > 0 && (
          <div className="use-category">
            <h3>Other Uses</h3>
            <ul>
              {plant.humanUses.other.map((use, i) => (
                <li key={i}>{use}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Propagation */}
      {plant.propagation && plant.propagation.length > 0 && (
        <section className="section">
          <h2>Propagation</h2>
          <ul className="propagation-list">
            {plant.propagation.map((method, i) => (
              <li key={i}>{method}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Nurseries */}
      {plant.nurseries && (
        <section className="section">
          <h2>Where to Source</h2>
          <p>{plant.nurseries}</p>
        </section>
      )}

      {/* Property Notes */}
      {plant.propertyNotes && (
        <section className="section property-notes">
          <h2>On the 50 Acres</h2>
          <p>{plant.propertyNotes}</p>
        </section>
      )}

      {/* Bibliography */}
      {plant.bibliography && plant.bibliography.length > 0 && (
        <section className="section bibliography">
          <h2>Sources</h2>
          <ul>
            {plant.bibliography.map((source, i) => (
              <li key={i}>{source}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Footer */}
      {plant.weekNumber && plant.profileDate && (
        <footer className="profile-footer">
          <p>Week {plant.weekNumber} · {plant.profileDate} · Food Forest Practicum</p>
        </footer>
      )}
    </div>
  );
};

export default PlantProfile;
