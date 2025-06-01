"use client"

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import React, { FunctionComponent, RefObject } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Equipes from './Equipes';

import '@/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
const EquipesWrapper: FunctionComponent<{baseBreadcrumbs: Bread[]}> = (props) => {
  
    const opRef = React.createRef<HTMLDivElement>();
  
  return (
    <>
      <div className="operator" ref={opRef}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={Fallback}>
            <Equipes baseBreadcrumbs={props.baseBreadcrumbs} parentOverlay={opRef} client={queryClient} />
          </ErrorBoundary>
        </QueryClientProvider>
      </div>
    </>
  );
}


export default EquipesWrapper;