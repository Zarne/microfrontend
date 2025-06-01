import React from 'react';
import { createRoot } from "react-dom/client";
import EquipesWrapper from './EquipesWrapper';

export const injector = (parentElementId, breadcrumb) => {
  const root = createRoot(parentElementId);
  return {
    render: () => {
      root.render(<EquipesWrapper baseBreadcrumbs={breadcrumb}/>);
    },
    unmount: () => {
      root.unmount();
    }
  };
};