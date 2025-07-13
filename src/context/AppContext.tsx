import React, { createContext, useState, ReactNode } from 'react';
import { CanvasElement } from '../types';

interface AppContextType {
  elements: CanvasElement[];
  selectedElement: CanvasElement | null;
  addElement: (element: CanvasElement) => void;
  updateElement: (id: string, element: Partial<CanvasElement>) => void;
  updateElementProperties: (id: string, properties: Record<string, any>) => void;
  removeElement: (id: string) => void;
  setSelectedElement: (element: CanvasElement | null) => void;
}

export const AppContext = createContext<AppContextType>({
  elements: [],
  selectedElement: null,
  addElement: () => {},
  updateElement: () => {},
  updateElementProperties: () => {},
  removeElement: () => {},
  setSelectedElement: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);

  const addElement = (element: CanvasElement) => {
    setElements((prevElements) => [...prevElements, element]);
    setSelectedElement(element);
  };

  const updateElement = (id: string, updatedProps: Partial<CanvasElement>) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, ...updatedProps } : element
      )
    );

    // Update selected element if it's the one being modified
    if (selectedElement?.id === id) {
      setSelectedElement((prev) => (prev ? { ...prev, ...updatedProps } : null));
    }
  };

  const updateElementProperties = (id: string, properties: Record<string, any>) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, properties } : element
      )
    );

    // Update selected element if it's the one being modified
    if (selectedElement?.id === id) {
      setSelectedElement((prev) =>
        prev ? { ...prev, properties } : null
      );
    }
  };

  const removeElement = (id: string) => {
    setElements((prevElements) => prevElements.filter((element) => element.id !== id));
    
    // Deselect if the removed element was selected
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        elements,
        selectedElement,
        addElement,
        updateElement,
        updateElementProperties,
        removeElement,
        setSelectedElement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};