import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import Canvas from './components/Canvas/Canvas';
import ComponentPanel from './components/ComponentPanel/ComponentPanel';
import PropertiesPanel from './components/PropertiesPanel/PropertiesPanel';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppProvider>
        <div className="app-container">
          <div className="component-panel">
            <ComponentPanel />
          </div>
          <div className="canvas">
            <Canvas />
          </div>
          <div className="properties-panel">
            <PropertiesPanel />
          </div>
        </div>
      </AppProvider>
    </DndProvider>
  );
}

export default App;