"use client"

import React, { FunctionComponent } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { LuActivity } from "react-icons/lu";
console.log(React.version);

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}
const Plannings: FunctionComponent<{name: string}> = (props) => {
  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <h1><LuActivity /> Page du planning</h1>
        <p>Planning de {props.name}.</p>

      </ErrorBoundary>
    </>
  );
}


export default Plannings;