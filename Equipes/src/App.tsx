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

const crombs = [{name: "Accueil", url: "/"}, {name: "Equipe", url: "/equipes"}] as Bread[];
const queryClient = new QueryClient()
const App: FunctionComponent = () => {

  
  const opRef = React.createRef<HTMLDivElement>();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="operator" ref={opRef}>
        <Equipes baseBreadcrumbs={crombs} parentOverlay={opRef} client={queryClient} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
