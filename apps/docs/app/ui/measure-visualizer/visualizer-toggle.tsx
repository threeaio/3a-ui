'use client';

import { Eye } from 'lucide-react';
import { Button } from '@3a-ui/ui/button';
import { EyeOff } from 'lucide-react';
import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

// Create a context for visualizer visibility
interface VisualizerContextType {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const VisualizerContext = createContext<VisualizerContextType>({
  visible: true,
  setVisible: () => {},
});

// Hook to use the visualizer context
export const useVisualizer = () => useContext(VisualizerContext);

interface VisualizerToggleProps {
  children: React.ReactNode;
}

export const VisualizerToggle: React.FC<VisualizerToggleProps> = ({ children }) => {
  // State for toggling visualizers

  const [visible, setVisible] = useState(true);

  return (
    <VisualizerContext.Provider value={{ visible, setVisible }}>
      {/* Render children with context */}
      {children}
    </VisualizerContext.Provider>
  );
};

// Separate component for the visualizer toggle button
export const VisualizerToggleButton = () => {
  const { visible, setVisible } = useVisualizer();

  const toggleVisualizers = () => setVisible((prev) => !prev);

  return (
    <Button variant="outline" size="sm" onClick={toggleVisualizers} className="flex items-center gap-2">
      {visible ? (
        <>
          <EyeOff className="h-4 w-4" />
          <span className="hidden md:inline">Hide Visualizers</span>
        </>
      ) : (
        <>
          <Eye className="h-4 w-4" />
          <span className="hidden md:inline">Show Visualizers</span>
        </>
      )}
    </Button>
  );
};
