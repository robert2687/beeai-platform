import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { AppContext } from '../../context/AppContext';
import { CanvasElement } from '../../types';
import CanvasItem from './CanvasItem';
import './Canvas.css';

const Canvas: React.FC = () => {
  const { elements, addElement, setSelectedElement } = useContext(AppContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: { type: string }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        // Create a new element with default properties based on type
        const newElement: CanvasElement = {
          id: `element-${Date.now()}`,
          type: item.type,
          position: {
            x: offset.x,
            y: offset.y,
          },
          properties: getDefaultProperties(item.type),
        };
        addElement(newElement);
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getDefaultProperties = (type: string) => {
    switch (type) {
      case 'Button':
        return { text: 'Button', color: '#3498db' };
      case 'Heading':
        return { text: 'Heading', size: 'h2' };
      case 'Paragraph':
        return { text: 'This is a paragraph of text.' };
      case 'Image':
        return { url: 'https://via.placeholder.com/150', alt: 'Placeholder image' };
      default:
        return {};
    }
  };

  return (
    <div
      ref={drop}
      className={`canvas-container ${isOver ? 'canvas-over' : ''}`}
      onClick={() => setSelectedElement(null)}
    >
      <h2>Canvas</h2>
      <div className="canvas-area">
        {elements.map((element) => (
          <CanvasItem
            key={element.id}
            element={element}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedElement(element);
            }}
          />
        ))}
        {elements.length === 0 && (
          <div className="empty-canvas">
            <p>Drag components here to start building</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;