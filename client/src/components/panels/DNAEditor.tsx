import React from 'react';
import { useDNA } from '../../lib/stores/useDNA';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const DNAEditor: React.FC = () => {
  const { 
    sequence, 
    selectedNucleotide, 
    editPosition, 
    setSelectedNucleotide, 
    editSequence,
    insertNucleotide,
    deleteNucleotide
  } = useDNA();

  const nucleotides = [
    { base: 'A', name: 'Adenine', color: '#FF6B6B' },
    { base: 'T', name: 'Thymine', color: '#4ECDC4' },
    { base: 'C', name: 'Cytosine', color: '#45B7D1' },
    { base: 'G', name: 'Guanine', color: '#96CEB4' }
  ];

  return (
    <Card className="dna-editor-panel">
      <CardHeader>
        <CardTitle>DNA/RNA Editor</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Nucleotide Selection */}
        <div className="nucleotide-selector">
          <h4>Select Nucleotide:</h4>
          <div className="nucleotide-buttons">
            {nucleotides.map((nucleotide) => (
              <Button
                key={nucleotide.base}
                variant={selectedNucleotide === nucleotide.base ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedNucleotide(nucleotide.base)}
                className="nucleotide-button"
                style={{
                  backgroundColor: selectedNucleotide === nucleotide.base ? nucleotide.color : undefined,
                  borderColor: nucleotide.color
                }}
              >
                <span className="nucleotide-symbol">{nucleotide.base}</span>
                <span className="nucleotide-name">{nucleotide.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Sequence Display */}
        <div className="sequence-display">
          <h4>Current Sequence:</h4>
          <div className="sequence-viewer">
            {sequence.map((base, index) => (
              <Button
                key={index}
                variant={editPosition === index ? "default" : "ghost"}
                size="sm"
                onClick={() => editSequence(index, selectedNucleotide)}
                className="sequence-base"
                style={{
                  color: nucleotides.find(n => n.base === base)?.color
                }}
              >
                {base}
              </Button>
            ))}
          </div>
        </div>

        {/* Edit Actions */}
        <div className="edit-actions">
          <Button
            variant="outline"
            size="sm"
            onClick={() => insertNucleotide(selectedNucleotide)}
            disabled={!selectedNucleotide}
            className="edit-button"
          >
            Insert
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteNucleotide(editPosition || 0)}
            disabled={editPosition === null}
            className="edit-button"
          >
            Delete
          </Button>
        </div>

        {/* CRISPR Tools */}
        <div className="crispr-tools">
          <h4>CRISPR Tools:</h4>
          <div className="tool-buttons">
            <Button variant="outline" size="sm">Cut & Insert</Button>
            <Button variant="outline" size="sm">Gene Knockout</Button>
            <Button variant="outline" size="sm">Base Editor</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DNAEditor;
