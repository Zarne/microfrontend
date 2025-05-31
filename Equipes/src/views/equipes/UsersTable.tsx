"use client"
import React, { FunctionComponent } from "react";
import {
  useQuery
} from '@tanstack/react-query';
import { Image, ListGroup, Spinner } from "react-bootstrap";


const UsersTable: FunctionComponent = () => {

    const { isLoading, isError, data: users } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
        fetch('/users').then((res) =>
            res.json(),
        ),
    })
    
    if (isError) {
        return <div>Oops, something went wrong!</div>;
    }

    if (isLoading) {
        return (    
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>);
    }
    
    return (
        <>
        <div>Users</div>
        
        <ListGroup>
            {users.map((user) => (
                <ListGroup.Item key={user._id} style={{backgroundColor: user.code_color}}>{user.name}</ListGroup.Item>
            ))}
        </ListGroup>
        </>
    );
}

export default UsersTable;