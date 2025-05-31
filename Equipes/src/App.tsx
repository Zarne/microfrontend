import { FunctionComponent, RefObject, useState } from "react";
import Equipes from "./views/equipes/Equipes";
import React from "react";
import Plannings from "./views/plannings/Plannings";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


/// chargement du mock des objects
const { worker } = require('@/mock/browser');
worker.start();


const queryClient = new QueryClient()
const App: FunctionComponent = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="operator">
        <Equipes name="Equipes"/>
        <Plannings name="Equipes"/>
      </div>
    </QueryClientProvider>
  );
};

export default App;
