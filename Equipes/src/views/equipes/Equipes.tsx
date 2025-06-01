"use client"

import ButtonAction from '@/components/ui/ButtonAction';
import { Stethoscope } from 'lucide-react';
import React, { FunctionComponent, RefObject, useState } from "react";
import { Breadcrumb } from 'react-bootstrap';
import UsersTable from './UsersTable';
import { QueryClient } from '@tanstack/react-query';


const UserEditDrawer = React.lazy(() => import('./UserEditDrawer'));

const Equipes: FunctionComponent<{baseBreadcrumbs: Bread[], parentOverlay:  RefObject<HTMLDivElement | null>, client: QueryClient}> = (props) => {
  const [userAddVisible, setUserAddVisible] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const breadcrumbs = [...props.baseBreadcrumbs, ...[{name: "Operateurs", url: "/equipes/operateurs"}]] as Bread[];
  const editUser = (visible: boolean, id?: string) => {
    setUserAddVisible(visible);
    if (id !== null) {
      setUserId(id);
    }
  }


  return (
    <>
      <h1><Stethoscope /> Operateurs</h1>
      
      <Breadcrumb>
        {breadcrumbs.map(bred => 
          <Breadcrumb.Item href={bred.url}>{bred.name}</Breadcrumb.Item>
        )}
      </Breadcrumb>
      
      <UsersTable editor={editUser} />

      <ButtonAction children={<span className="visually-hidden">Ajouter</span>} action={() => setUserAddVisible(true)} />

      {userAddVisible && 
            <React.Suspense fallback={<div>Loading...</div>}>
                <UserEditDrawer show={userAddVisible} setter={editUser} id={userId!} parentOverlay={props.parentOverlay} client={props.client} />
            </React.Suspense>
      }
    </>
  );
}


export default Equipes;
