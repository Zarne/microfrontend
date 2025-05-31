"use client"
import { CirclePlus } from "lucide-react";
import React, { FunctionComponent } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import styled from "styled-components";


const ButtonActionComp = ({ children, action }) => {
  return (
    <div className="position-absolute bottom-0 end-0 m-5">
      <Button variant="success" onClick={action}><CirclePlus /></Button>
    </div>
  );
};

const StyledButtonActionComp = styled(ButtonActionComp)`
`;

const ButtonAction: FunctionComponent<{children, action}> = (props) => {
    return (
        <>
          <StyledButtonActionComp children={props.children} action={props.action}/>
        </> 
    );
}

export default ButtonAction;