import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { saveLayoutToFirestore, generateCodeFromLayout } from '../../services/firebaseService';
import './SaveButton.css';

const SaveButton: React.FC = () => {
  const { elements } = useContext(AppContext);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleSave = async () => {
    if (elements.length === 0) {
      alert('Cannot save an empty layout. Add some elements first!');
      return;
    }

    setIsSaving(true);
    try {
      const layoutName = prompt('Enter a name for this layout:', `Layout ${new Date().toLocaleString()}`);
      if (layoutName) {
        const id = await saveLayoutToFirestore(elements, layoutName);
        setSavedId(id);
        alert(`Layout saved successfully with ID: ${id}`);
      }
    } catch (error) {
      console.error('Error saving layout:', error);
      alert('Failed to save layout. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateCode = async () => {
    if (elements.length === 0) {
      alert('Cannot generate code for an empty layout. Add some elements first!');
      return;
    }

    setIsGeneratingCode(true);
    try {
      const code = await generateCodeFromLayout(elements);
      setGeneratedCode(code);
      // In a real app, you might want to show this in a modal or a new tab
      console.log('Generated code:', code);
      alert('Code generated successfully! Check the console for details.');
    } catch (error) {
      console.error('Error generating code:', error);
      alert('Failed to generate code. Please try again.');
    } finally {
      setIsGeneratingCode(false);
    }
  };

  return (
    <div className="save-button-container">
      <button 
        className="save-button" 
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Layout'}
      </button>
      <button 
        className="generate-button" 
        onClick={handleGenerateCode}
        disabled={isGeneratingCode}
      >
        {isGeneratingCode ? 'Generating...' : 'Generate Code'}
      </button>
      {savedId && (
        <div className="save-success">
          Layout saved with ID: {savedId}
        </div>
      )}
    </div>
  );
};

export default SaveButton;