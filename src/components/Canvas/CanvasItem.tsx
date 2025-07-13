import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
import { AppContext } from '../../context/AppContext';
import { CanvasElement } from '../../types';

interface CanvasItemProps {
  element: CanvasElement;
  onClick: (e: React.MouseEvent) => void;
}

const CanvasItem: React.FC<CanvasItemProps> = ({ element, onClick }) => {
  const { selectedElement } = useContext(AppContext);
  const isSelected = selectedElement?.id === element.id;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CANVAS_ITEM',
    item: element,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const renderElement = () => {
    switch (element.type) {
      case 'Button':
        return (
          <button
            style={{
              backgroundColor: element.properties.color,
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {element.properties.text}
          </button>
        );
      case 'Heading':
        const HeadingTag = element.properties.size as keyof JSX.IntrinsicElements;
        return <HeadingTag>{element.properties.text}</HeadingTag>;
      case 'Paragraph':
        return <p>{element.properties.text}</p>;
      case 'Image':
        return (
          <img
            src={element.properties.url}
            alt={element.properties.alt}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        );
      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <div
      ref={drag}
      className={`canvas-item ${isSelected ? 'selected' : ''}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={onClick}
    >
      {renderElement()}
    </div>
  );
};

export default CanvasItem;