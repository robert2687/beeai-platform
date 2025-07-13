import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './PropertiesPanel.css';

const PropertiesPanel: React.FC = () => {
  const { selectedElement, updateElementProperties } = useContext(AppContext);

  const handlePropertyChange = (property: string, value: string) => {
    if (selectedElement) {
      updateElementProperties(selectedElement.id, {
        ...selectedElement.properties,
        [property]: value,
      });
    }
  };

  const renderPropertiesForm = () => {
    if (!selectedElement) {
      return (
        <div className="no-selection">
          <p>Select an element on the canvas to edit its properties</p>
        </div>
      );
    }

    switch (selectedElement.type) {
      case 'Button':
        return (
          <div className="properties-form">
            <div className="form-group">
              <label htmlFor="button-text">Button Text</label>
              <input
                id="button-text"
                type="text"
                value={selectedElement.properties.text || ''}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="button-color">Button Color</label>
              <input
                id="button-color"
                type="color"
                value={selectedElement.properties.color || '#3498db'}
                onChange={(e) => handlePropertyChange('color', e.target.value)}
              />
            </div>
          </div>
        );
      case 'Heading':
        return (
          <div className="properties-form">
            <div className="form-group">
              <label htmlFor="heading-text">Heading Text</label>
              <input
                id="heading-text"
                type="text"
                value={selectedElement.properties.text || ''}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="heading-size">Heading Size</label>
              <select
                id="heading-size"
                value={selectedElement.properties.size || 'h2'}
                onChange={(e) => handlePropertyChange('size', e.target.value)}
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>
          </div>
        );
      case 'Paragraph':
        return (
          <div className="properties-form">
            <div className="form-group">
              <label htmlFor="paragraph-text">Paragraph Text</label>
              <textarea
                id="paragraph-text"
                value={selectedElement.properties.text || ''}
                onChange={(e) => handlePropertyChange('text', e.target.value)}
                rows={5}
              />
            </div>
          </div>
        );
      case 'Image':
        return (
          <div className="properties-form">
            <div className="form-group">
              <label htmlFor="image-url">Image URL</label>
              <input
                id="image-url"
                type="text"
                value={selectedElement.properties.url || ''}
                onChange={(e) => handlePropertyChange('url', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image-alt">Alt Text</label>
              <input
                id="image-alt"
                type="text"
                value={selectedElement.properties.alt || ''}
                onChange={(e) => handlePropertyChange('alt', e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <div className="properties-panel-container">
      <h2>Properties</h2>
      {renderPropertiesForm()}
      {selectedElement && (
        <div className="element-info">
          <p>
            <strong>Element ID:</strong> {selectedElement.id}
          </p>
          <p>
            <strong>Type:</strong> {selectedElement.type}
          </p>
          <p>
            <strong>Position:</strong> X: {Math.round(selectedElement.position.x)}, Y:{' '}
            {Math.round(selectedElement.position.y)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;