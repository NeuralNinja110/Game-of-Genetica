import { create } from "zustand";

interface DrugComponent {
  id: string;
  name: string;
  type: string;
  atoms: Array<{
    element: string;
    bonds: number;
  }>;
  properties: {
    hydrophobic: boolean;
    charged: boolean;
    size: 'small' | 'medium' | 'large';
  };
}

interface DrugState {
  drugComponents: DrugComponent[];
  availableComponents: DrugComponent[];
  selectedComponent: string | null;
  bindingTarget: string | null;
  
  // Actions
  addComponent: (component: DrugComponent) => void;
  removeComponent: (index: number) => void;
  setSelectedComponent: (componentId: string) => void;
  setBindingTarget: (target: string) => void;
  clearDrug: () => void;
  simulateDrug: () => Promise<string>;
}

export const useDrug = create<DrugState>((set, get) => ({
  drugComponents: [],
  availableComponents: [
    // DNA/RNA Targeting Agents
    {
      id: 'nucleoside_analog',
      name: 'Nucleoside Analog',
      type: 'DNA/RNA Targeting',
      atoms: [
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'N', bonds: 3 },
        { element: 'N', bonds: 3 },
        { element: 'O', bonds: 2 },
        { element: 'O', bonds: 2 },
        { element: 'O', bonds: 2 },
        { element: 'P', bonds: 5 },
        { element: 'H', bonds: 1 },
        { element: 'H', bonds: 1 },
        { element: 'H', bonds: 1 },
        { element: 'H', bonds: 1 }
      ],
      properties: {
        hydrophobic: false,
        charged: true,
        size: 'medium'
      }
    },
    {
      id: 'intercalating_agent',
      name: 'Intercalating Agent',
      type: 'DNA/RNA Targeting',
      atoms: [
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'N', bonds: 3 },
        { element: 'N', bonds: 3 },
        { element: 'O', bonds: 2 },
        { element: 'H', bonds: 1 },
        { element: 'H', bonds: 1 }
      ],
      properties: {
        hydrophobic: true,
        charged: false,
        size: 'large'
      }
    },
    // Protein Inhibitors
    {
      id: 'enzyme_inhibitor',
      name: 'Enzyme Inhibitor',
      type: 'Protein Inhibitors',
      atoms: [
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'N', bonds: 3 },
        { element: 'N', bonds: 3 },
        { element: 'O', bonds: 2 },
        { element: 'S', bonds: 2 },
        { element: 'H', bonds: 1 },
        { element: 'H', bonds: 1 }
      ],
      properties: {
        hydrophobic: true,
        charged: false,
        size: 'small'
      }
    },
    {
      id: 'protease_inhibitor',
      name: 'Protease Inhibitor',
      type: 'Protein Inhibitors',
      atoms: [
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'N', bonds: 3 },
        { element: 'O', bonds: 2 },
        { element: 'O', bonds: 2 },
        { element: 'F', bonds: 1 },
        { element: 'H', bonds: 1 }
      ],
      properties: {
        hydrophobic: false,
        charged: true,
        size: 'medium'
      }
    },
    // Delivery Systems
    {
      id: 'lipid_carrier',
      name: 'Lipid Carrier',
      type: 'Delivery Systems',
      atoms: [
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'O', bonds: 2 },
        { element: 'O', bonds: 2 },
        { element: 'P', bonds: 5 },
        { element: 'N', bonds: 3 },
        { element: 'H', bonds: 1 },
        { element: 'H', bonds: 1 }
      ],
      properties: {
        hydrophobic: true,
        charged: false,
        size: 'large'
      }
    },
    {
      id: 'targeting_ligand',
      name: 'Targeting Ligand',
      type: 'Delivery Systems',
      atoms: [
        { element: 'C', bonds: 4 },
        { element: 'C', bonds: 4 },
        { element: 'N', bonds: 3 },
        { element: 'O', bonds: 2 },
        { element: 'S', bonds: 2 },
        { element: 'H', bonds: 1 },
        { element: 'H', bonds: 1 },
        { element: 'H', bonds: 1 }
      ],
      properties: {
        hydrophobic: false,
        charged: true,
        size: 'small'
      }
    }
  ],
  selectedComponent: null,
  bindingTarget: null,
  
  addComponent: (component) => {
    const { drugComponents } = get();
    console.log(`Adding component: ${component.name}`);
    set({ 
      drugComponents: [...drugComponents, { ...component, id: `${component.id}_${Date.now()}` }] 
    });
  },
  
  removeComponent: (index) => {
    const { drugComponents } = get();
    const newComponents = drugComponents.filter((_, i) => i !== index);
    console.log(`Removed component at index ${index}`);
    set({ drugComponents: newComponents });
  },
  
  setSelectedComponent: (componentId) => {
    console.log(`Selected component: ${componentId}`);
    set({ selectedComponent: componentId });
  },
  
  setBindingTarget: (target) => {
    console.log(`Set binding target: ${target}`);
    set({ bindingTarget: target });
  },
  
  clearDrug: () => {
    set({ 
      drugComponents: [],
      selectedComponent: null,
      bindingTarget: null
    });
  },
  
  simulateDrug: async () => {
    const { drugComponents, bindingTarget } = get();
    
    console.log('Simulating drug interaction:', drugComponents.length, 'components');
    
    if (drugComponents.length === 0) {
      return 'failure';
    }
    
    // Simplified drug simulation
    // Real implementation would involve molecular dynamics, binding affinity calculations, etc.
    
    // Check for toxicity (too many components)
    if (drugComponents.length > 5) {
      return 'failure'; // Too complex, likely toxic
    }
    
    // Check for complementary components
    const hasTargeting = drugComponents.some(c => c.type === 'DNA/RNA Targeting');
    const hasInhibitor = drugComponents.some(c => c.type === 'Protein Inhibitors');
    const hasDelivery = drugComponents.some(c => c.type === 'Delivery Systems');
    
    if (hasTargeting && hasInhibitor && hasDelivery) {
      return 'success'; // Well-balanced drug
    } else if (hasTargeting || hasInhibitor) {
      return 'partial'; // Some effectiveness
    }
    
    return 'failure';
  }
}));
