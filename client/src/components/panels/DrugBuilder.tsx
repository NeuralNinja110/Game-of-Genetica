import React from 'react';
import { useDrug } from '../../lib/stores/useDrug';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const DrugBuilder: React.FC = () => {
  const { 
    drugComponents, 
    availableComponents, 
    selectedComponent, 
    addComponent, 
    removeComponent, 
    setSelectedComponent 
  } = useDrug();

  const componentCategories = {
    'DNA/RNA Targeting': [
      { id: 'nucleoside_analog', name: 'Nucleoside Analog', description: 'Mimics DNA/RNA building blocks' },
      { id: 'intercalating_agent', name: 'Intercalating Agent', description: 'Inserts between DNA bases' },
      { id: 'alkylating_agent', name: 'Alkylating Agent', description: 'Forms covalent bonds with DNA' }
    ],
    'Protein Inhibitors': [
      { id: 'enzyme_inhibitor', name: 'Enzyme Inhibitor', description: 'Blocks enzyme active sites' },
      { id: 'receptor_antagonist', name: 'Receptor Antagonist', description: 'Blocks receptor binding' },
      { id: 'allosteric_modulator', name: 'Allosteric Modulator', description: 'Changes protein shape' }
    ],
    'Membrane Disruptors': [
      { id: 'pore_former', name: 'Pore Former', description: 'Creates holes in membranes' },
      { id: 'lipid_disruptor', name: 'Lipid Disruptor', description: 'Disrupts membrane structure' },
      { id: 'ion_channel_blocker', name: 'Ion Channel Blocker', description: 'Blocks ion transport' }
    ],
    'Delivery Systems': [
      { id: 'liposome', name: 'Liposome', description: 'Lipid-based drug carrier' },
      { id: 'nanoparticle', name: 'Nanoparticle', description: 'Targeted drug delivery' },
      { id: 'antibody_conjugate', name: 'Antibody Conjugate', description: 'Antibody-guided delivery' }
    ]
  };

  return (
    <Card className="drug-builder-panel">
      <CardHeader>
        <CardTitle>Drug Builder</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Component Categories */}
        <div className="component-categories">
          {Object.entries(componentCategories).map(([category, components]) => (
            <div key={category} className="category-section">
              <h4 className="category-title">{category}</h4>
              <div className="component-grid">
                {components.map((component) => (
                  <div
                    key={component.id}
                    className={`component-card ${selectedComponent === component.id ? 'selected' : ''}`}
                    onClick={() => setSelectedComponent(component.id)}
                  >
                    <div className="component-name">{component.name}</div>
                    <div className="component-description">{component.description}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        addComponent(component);
                      }}
                      className="add-component-btn"
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current Drug Composition */}
        <div className="current-drug">
          <h4>Current Drug Composition:</h4>
          <div className="drug-components">
            {drugComponents.map((component, index) => (
              <div key={index} className="drug-component-item">
                <span className="component-name">{component.name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeComponent(index)}
                  className="remove-btn"
                >
                  ×
                </Button>
              </div>
            ))}
            {drugComponents.length === 0 && (
              <div className="empty-drug">
                No components added. Select components from the categories above.
              </div>
            )}
          </div>
        </div>

        {/* Drug Properties */}
        <div className="drug-properties">
          <h4>Predicted Properties:</h4>
          <div className="properties-grid">
            <div className="property">
              <span className="property-label">Binding Affinity:</span>
              <div className="property-bar">
                <div className="property-fill" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className="property">
              <span className="property-label">Toxicity Risk:</span>
              <div className="property-bar toxicity">
                <div className="property-fill" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div className="property">
              <span className="property-label">Selectivity:</span>
              <div className="property-bar">
                <div className="property-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DrugBuilder;
