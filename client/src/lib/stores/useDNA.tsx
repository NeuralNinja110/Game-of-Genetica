import { create } from "zustand";

interface DNAState {
  sequence: string[];
  selectedNucleotide: string | null;
  editPosition: number | null;
  isRNA: boolean;
  
  // Actions
  setSelectedNucleotide: (nucleotide: string) => void;
  setEditPosition: (position: number) => void;
  editSequence: (position: number, nucleotide: string) => void;
  insertNucleotide: (nucleotide: string) => void;
  deleteNucleotide: (position: number) => void;
  toggleRNA: () => void;
  resetSequence: () => void;
  simulateEdit: () => Promise<string>;
}

export const useDNA = create<DNAState>((set, get) => ({
  sequence: ['A', 'T', 'G', 'C', 'G', 'A', 'T', 'C', 'C', 'G', 'A', 'A', 'T', 'G', 'C', 'G'],
  selectedNucleotide: null,
  editPosition: null,
  isRNA: false,
  
  setSelectedNucleotide: (nucleotide) => {
    console.log(`Selected nucleotide: ${nucleotide}`);
    set({ selectedNucleotide: nucleotide });
  },
  
  setEditPosition: (position) => {
    console.log(`Edit position: ${position}`);
    set({ editPosition: position });
  },
  
  editSequence: (position, nucleotide) => {
    const { sequence } = get();
    const newSequence = [...sequence];
    newSequence[position] = nucleotide;
    
    console.log(`Edited position ${position} to ${nucleotide}`);
    set({ 
      sequence: newSequence,
      editPosition: position
    });
  },
  
  insertNucleotide: (nucleotide) => {
    const { sequence, editPosition } = get();
    const newSequence = [...sequence];
    const insertPos = editPosition !== null ? editPosition : sequence.length;
    
    newSequence.splice(insertPos, 0, nucleotide);
    
    console.log(`Inserted ${nucleotide} at position ${insertPos}`);
    set({ 
      sequence: newSequence,
      editPosition: insertPos + 1
    });
  },
  
  deleteNucleotide: (position) => {
    const { sequence } = get();
    if (sequence.length <= 1) return;
    
    const newSequence = [...sequence];
    newSequence.splice(position, 1);
    
    console.log(`Deleted nucleotide at position ${position}`);
    set({ 
      sequence: newSequence,
      editPosition: Math.min(position, newSequence.length - 1)
    });
  },
  
  toggleRNA: () => {
    const { sequence, isRNA } = get();
    const newIsRNA = !isRNA;
    
    let newSequence = [...sequence];
    if (newIsRNA) {
      // Convert T to U for RNA
      newSequence = newSequence.map(base => base === 'T' ? 'U' : base);
    } else {
      // Convert U to T for DNA
      newSequence = newSequence.map(base => base === 'U' ? 'T' : base);
    }
    
    console.log(`Toggled to ${newIsRNA ? 'RNA' : 'DNA'}`);
    set({ 
      sequence: newSequence,
      isRNA: newIsRNA
    });
  },
  
  resetSequence: () => {
    set({ 
      sequence: ['A', 'T', 'G', 'C', 'G', 'A', 'T', 'C', 'C', 'G', 'A', 'A', 'T', 'G', 'C', 'G'],
      selectedNucleotide: null,
      editPosition: null,
      isRNA: false
    });
  },
  
  simulateEdit: async () => {
    const { sequence } = get();
    
    // Simplified biological simulation
    // In reality, this would involve complex protein folding predictions,
    // gene expression analysis, etc.
    
    console.log('Simulating DNA edit:', sequence.join(''));
    
    // Check for stop codons (simplified)
    const sequenceStr = sequence.join('');
    if (sequenceStr.includes('TAG') || sequenceStr.includes('TAA') || sequenceStr.includes('TGA')) {
      return 'failure'; // Premature stop codon
    }
    
    // Check for known beneficial patterns (simplified)
    if (sequenceStr.includes('ATGCGA') || sequenceStr.includes('GCGAAT')) {
      return 'success'; // Beneficial mutation
    }
    
    // Default to partial success
    return 'partial';
  }
}));
