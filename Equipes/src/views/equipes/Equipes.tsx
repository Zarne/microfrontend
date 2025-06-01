"use client"

import { CirclePlus, Stethoscope } from 'lucide-react';
import React, { FunctionComponent, RefObject, useState } from "react";
import { Breadcrumb, Button } from 'react-bootstrap';
import UsersTable from './UsersTable';
import ButtonAction from '@/components/ui/ButtonAction';
import { LuActivity } from 'react-icons/lu';


const UserEditDrawer = React.lazy(() => import('./UserEditDrawer'));

const Equipes: FunctionComponent<{name: string, baseBreadcrumbs: Bread[], parentOverlay:  RefObject<HTMLDivElement | null>}> = (props) => {
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
                <UserEditDrawer show={userAddVisible} setter={editUser} id={userId!} parentOverlay={props.parentOverlay} />
            </React.Suspense>
      }
    </>
  );
}


export default Equipes;
