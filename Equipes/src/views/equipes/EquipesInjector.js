import React from 'react';
import { createRoot } from "react-dom/client";
import EquipesWrapper from './EquipesWrapper';

export const injector = (parentElementId) => {
  const root = createRoot(parentElementId);
  return {
    render: () => {
      root.render(<EquipesWrapper />);
    },
    unmount: () => {
      root.unmount();
    }
  };
};