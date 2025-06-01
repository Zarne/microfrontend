"use client";

import React, { useEffect } from 'react'; // → https://esm.sh/react@19.1.0
import { createRoot } from 'react-dom/client'; // → https://esm.sh/react-dom@19.1.0
import { getModuleComponent, getModuleService } from './ModuleManger.js';

console.log(React.version);
window.env.Equipes_PACKAGE = 'https://localhost:9400/remoteEntry.js';
const EquipesConf = {
  "path": window.env.Equipes_PACKAGE, // Path to remote container entry. Ideally CDN location in live environments.
  "scope": "yarum", // Container scope name
  "module": "./Equipes" // Shared module
}
const EquipesInjectorConf = {
  "path": window.env.Equipes_PACKAGE, // Path to remote container entry. Ideally CDN location in live environments.
  "scope": "yarum", // Container scope name
  "module": "./EquipesInjector", // Shared module
  "comp": "injector"

}
const PlanningsConf = {
  "path": window.env.Equipes_PACKAGE, // Path to remote container entry. Ideally CDN location in live environments.
  "scope": "yarum", // Container scope name
  "module": "./Plannings" // Shared module
}
const parentElementId = 'equipe';


    const crombs = [{name: "Accueil", url: "/"}, {name: "Equipe", url: "/equipes"}];
    const Fallback = () => <div>Le composants n'a pas pu être chargé</div>;
    
    const App = () => {
        useEffect(() => {

            getModuleService(EquipesInjectorConf, Fallback)
                .then(equipesInject => {
                    const equipe = equipesInject(document.getElementById(parentElementId));
                    equipe.render();
                    return () => equipe.unmount();
                })
                
        }, []);

        const MyComponent = React.lazy(() => getModuleComponent(PlanningsConf, Fallback, {baseBreadcrumbs: crombs}));

        return (
            <div>
            <h1>Host Application - React Version {React.version}</h1>
            <h2>App 1</h2>
            <div id={parentElementId}></div>

            </div>
            );

    };


    createRoot(document.getElementById('root')).render(<App />);