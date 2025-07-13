import React from 'react';
import { useDrag } from 'react-dnd';
import './ComponentPanel.css';

interface ComponentItemProps {
  type: string;
  label: string;
  icon: string;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`component-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="component-icon">{icon}</span>
      <span className="component-label">{label}</span>
    </div>
  );
};

const ComponentPanel: React.FC = () => {
  const components = [
    { type: 'Button', label: 'Button', icon: '🔘' },
    { type: 'Heading', label: 'Heading', icon: 'H' },
    { type: 'Paragraph', label: 'Paragraph', icon: '¶' },
    { type: 'Image', label: 'Image', icon: '🖼️' },
  ];

  return (
    <div className="component-panel-container">
      <h2>Components</h2>
      <div className="component-list">
        {components.map((component) => (
          <ComponentItem
            key={component.type}
            type={component.type}
            label={component.label}
            icon={component.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ComponentPanel;