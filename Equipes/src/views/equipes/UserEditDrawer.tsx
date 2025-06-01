import { useQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';
import React, { FunctionComponent, RefObject } from 'react';
import { Form, Placeholder } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';


const UserEditDrawer: FunctionComponent<{show: boolean, setter: (visible: boolean) => void, id?: string, parentOverlay:  RefObject<HTMLDivElement | null>}> = (props) => {

  const handleClose = () => props.setter(false);
  const { isLoading, isError, data: users } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
        fetch('/users').then((res) =>
            res.json(),
        ),
        enabled: !!props.id,
    })

  return (
    <>
      <Offcanvas show={props.show} restoreFocus={false} onHide={handleClose} container={props.parentOverlay.current}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><User /> Opérateur</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
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
              <Form.Control type="text" aria-label="Rôle de l'opérateur" title="Rôle de l'opérateur" placeholder="Rôle de l'opérateur" disabled={!!props.id} readOnly={!!props.id} />}
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicColor">
              <Form.Label>Couleur</Form.Label>
              {isLoading ? 
              <Placeholder as="span" animation="glow"><Placeholder xs={12} /></Placeholder>
              :
              <Form.Control type="color" defaultValue="#563d7c" aria-label="Couleur de l'opérateur" title="Couleur de l'opérateur" disabled={!!props.id} readOnly={!!props.id} />}
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicDateCreate">
              <Form.Label>Date de création</Form.Label>
              {isLoading ? 
              <Placeholder as="span" animation="glow"><Placeholder xs={12} /></Placeholder>
              :
              <Form.Control type="text" aria-label="Date de création de l'opérateur" title="Date de création de l'opérateur" placeholder="Date de création" disabled={!!props.id} readOnly={!!props.id} />}
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicDateUpdate">
              <Form.Label>Date de modification</Form.Label>
              {isLoading ? 
              <Placeholder as="span" animation="glow"><Placeholder xs={12} /></Placeholder>
              :
              <Form.Control type="text" aria-label="Date de modification de l'opérateur" title="Date de modification de l'opérateur" placeholder="Date de modification" disabled={!!props.id} readOnly={!!props.id} />}
            </Form.Group>

          </Form>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default UserEditDrawer;