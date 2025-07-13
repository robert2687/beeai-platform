import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SaveButton from '../SaveButton/SaveButton';
import CodeGenerator from '../CodeGenerator/CodeGenerator';
import './Toolbar.css';

const Toolbar: React.FC = () => {
  const { elements, removeElement, selectedElement } = useContext(AppContext);

  const handleDelete = () => {
    if (selectedElement) {
      removeElement(selectedElement.id);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
      // Clear all elements by setting an empty array
      elements.forEach(element => removeElement(element.id));
    }
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-actions">
        <button 
          className="toolbar-button delete-button" 
          onClick={handleDelete}
          disabled={!selectedElement}
        >
          Delete Selected
        </button>
        <button 
          className="toolbar-button clear-button" 
          onClick={handleClear}
          disabled={elements.length === 0}
        >
          Clear Canvas
        </button>
      </div>
      <SaveButton />
      <CodeGenerator />
    </div>
  );
};

export default Toolbar;