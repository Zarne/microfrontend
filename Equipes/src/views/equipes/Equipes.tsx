"use client"

import { CirclePlus } from 'lucide-react';
import React, { FunctionComponent, useState } from "react";
import { Button } from 'react-bootstrap';
import UsersTable from './UsersTable';
import ButtonAction from '@/components/ui/ButtonAction';
import { LuActivity } from 'react-icons/lu';


const UserAddDrawer = React.lazy(() => import('./UserAddDrawer'));

const Equipes: FunctionComponent<{name: string}> = (props) => {
  const [userAddVisible, setUserAddVisible] = useState(false);

  return (
    <>
      <h1><LuActivity /> Page d'accueil</h1>
      <p>Bienvenue sur la page d'accueil de l'application {props.name}.</p>
      
      <UsersTable />

      <ButtonAction children={<span className="visually-hidden">Ajouter</span>} action={() => setUserAddVisible(true)} />

      {userAddVisible && 
            <React.Suspense fallback={<div>Loading...</div>}>
                <UserAddDrawer show={userAddVisible} setter={setUserAddVisible} />
            </React.Suspense>
      }
    </>
  );
}


export default Equipes;