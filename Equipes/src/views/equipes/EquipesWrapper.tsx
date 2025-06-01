"use client"

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import React, { FunctionComponent, RefObject } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Equipes from './Equipes';

console.log(React.version);

/// chargement du mock des objects
const { worker } = require('@/mock/browser');
worker.start();

const queryClient = new QueryClient()

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
const EquipesWrapper: FunctionComponent<{name: string, baseBreadcrumbs: Bread[], parentOverlay:  RefObject<HTMLDivElement | null>}> = (props) => {
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Equipes name={props.name} baseBreadcrumbs={props.baseBreadcrumbs} parentOverlay={props.parentOverlay} />
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}


export default EquipesWrapper;