"use client"
import {
    useQuery
} from '@tanstack/react-query';
import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import { Badge, Placeholder, Table } from "react-bootstrap";

const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY HH:mm:ss") ;
}

const handleEdit = (editor, id) => {
    editor(true, id);
}

const UsersTable: FunctionComponent<{editor: (visible: boolean, id?: string) => void}> = (props) => {

    const { isLoading, isError, data: users } = useQuery({
        queryKey: ['repoDataUsers'],
        queryFn: () =>
        fetch('/users').then((res) =>
            res.json(),
        ),
    })
    
    if (isError) {
        return <div>Oops, something went wrong!</div>;
    }

    const TrSkeleton = () => {
        return (
            <tr>
                <th><Placeholder as="span" animation="glow"><Placeholder xs={6} /></Placeholder></th>
                <th><Placeholder as="span" animation="glow"><Placeholder xs={6} /></Placeholder></th>
                <th><Placeholder as="span" animation="glow"><Placeholder xs={6} /></Placeholder></th>
                <th><Placeholder as="span" animation="glow"><Placeholder xs={6} /></Placeholder></th>
                <th><Placeholder as="span" animation="glow"><Placeholder xs={6} /></Placeholder></th>
            </tr>)}
            
    
    return (
        <>
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Rôle</th>
                <th>Couleur</th>
                <th>Date création</th>
                <th>Date modification</th>
            </tr>
        </thead>
        <tbody>
             {isLoading ? 
                (<>
                <TrSkeleton />
                <TrSkeleton />
                <TrSkeleton />
                <TrSkeleton />
                </>) : 
            users.map((user) => (
                <tr key={user._id} onClick={() => handleEdit(props.editor, user._id)}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td style={{backgroundColor: user.code_color}}>{user.code_color}</td>
                    <td>{formatDate(user.created_at)}</td>
                    <td>{formatDate(user.updated_at)}</td>
                </tr>
            ))}
        </tbody>
        
        </Table>
        </>
    );
}

export default UsersTable;