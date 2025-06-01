import { QueryClient, useQuery } from '@tanstack/react-query';
import { Save, User, UserMinus, UserPen, X } from 'lucide-react';
import React, { FunctionComponent, RefObject, useMemo, useState } from 'react';
import { Button, Form, Placeholder } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';


const UserEditDrawer: FunctionComponent<{client: QueryClient, show: boolean, setter: (visible: boolean) => void, id?: string, parentOverlay:  RefObject<HTMLDivElement | null>}> = (props) => {

  
  const placeholderData = useMemo(() => {return {} as Operator}, [])
  const [userData, setUserData] = useState({} as Operator);
  const handleClose = () => {
    props.setter(false);
    props.client.invalidateQueries({ queryKey: ['repoDataUser'] })
  };
  const { isLoading, isError, data: users } = useQuery({
        queryKey: ['repoDataUser', props.id],
        queryFn: () =>
        fetch('/users/' + props.id).then((res) =>
            res.json(),
        ),
        placeholderData,
        enabled: !!props.id,
    })

  return (
    <>
      <Offcanvas show={props.show} placement="end" restoreFocus={false} onHide={handleClose} container={props.parentOverlay.current} className="w-50
      ">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="d-flex justify-content-between align-items-center">
                <div><User /> Opérateur</div>
                {props.id && <div><Button variant='outline-dark' className='mx-3'  size="sm"><UserPen /> Modifer</Button></div>}
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column" style={{height: '100%'}}>
          
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nom</Form.Label>
              {isLoading ? 
              <Placeholder as="span" animation="glow"><Placeholder xs={12} /></Placeholder>
              :
              <Form.Control type="text" defaultValue={users.name}  aria-label="Nom de l'opérateur" title="Nom de l'opérateur" placeholder="Nom de l'opérateur" disabled={!!props.id} readOnly={!!props.id} />}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Rôle</Form.Label>
              {isLoading ? 
              <Placeholder as="span" animation="glow"><Placeholder xs={12} /></Placeholder>
              :
              <Form.Control type="text" defaultValue={users.role} aria-label="Rôle de l'opérateur" title="Rôle de l'opérateur" placeholder="Rôle de l'opérateur" disabled={!!props.id} readOnly={!!props.id} />}
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicColor">
              <Form.Label>Couleur</Form.Label>
              {isLoading ? 
              <Placeholder as="span" animation="glow"><Placeholder xs={12} /></Placeholder>
              :
              <Form.Control type="color" defaultValue={users.code_color} aria-label="Couleur de l'opérateur" title="Couleur de l'opérateur" disabled={!!props.id} readOnly={!!props.id} />}
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicDateCreate">
              <Form.Label>Date de création</Form.Label>
              {isLoading ? 
              <Placeholder as="span" animation="glow"><Placeholder xs={12} /></Placeholder>
              :
              <Form.Control type="text" defaultValue={users.created_at} aria-label="Date de création de l'opérateur" title="Date de création de l'opérateur" placeholder="Date de création" disabled={!!props.id} readOnly={!!props.id} />}
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicDateUpdate">
              <Form.Label>Date de modification</Form.Label>
              {isLoading ? 
              <Placeholder as="span" animation="glow"><Placeholder xs={12} /></Placeholder>
              :
              <Form.Control type="text" defaultValue={users.updated_at} aria-label="Date de modification de l'opérateur" title="Date de modification de l'opérateur" placeholder="Date de modification" disabled={!!props.id} readOnly={!!props.id} />}
            </Form.Group>

          </Form>
          <div className="mt-auto p-2">
            <div className="d-flex justify-content-end">
                <Button variant='primary' className='me-3'><Save /> Sauvegarder</Button>
                {props.id && <Button variant='warning' className='me-3'><UserMinus /> Supprimer</Button>}
                <Button variant='secondary' onClick={handleClose}><X /> Annuler</Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default UserEditDrawer;