import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { generateCodePrompt } from '../../services/firebaseService';
import './CodeGenerator.css';

const CodeGenerator: React.FC = () => {
  const { elements } = useContext(AppContext);
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePrompt = () => {
    if (elements.length === 0) {
      alert('Cannot generate a prompt for an empty layout. Add some elements first!');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedPrompt = generateCodePrompt(elements);
      setPrompt(generatedPrompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
      alert('Failed to generate prompt. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
      .then(() => {
        alert('Prompt copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy prompt:', err);
        alert('Failed to copy prompt to clipboard.');
      });
  };

  return (
    <div className="code-generator-container">
      <h2>Code Generator</h2>
      <button 
        className="generate-prompt-button" 
        onClick={handleGeneratePrompt}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate Prompt for CodeLlama'}
      </button>
      
      {prompt && (
        <div className="prompt-container">
          <div className="prompt-header">
            <h3>Generated Prompt</h3>
            <button className="copy-button" onClick={handleCopyPrompt}>
              Copy to Clipboard
            </button>
          </div>
          <pre className="prompt-content">{prompt}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;