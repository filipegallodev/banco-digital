import React from "react";
import { Alert, Fade } from "@mui/material";
import styled from "styled-components";

const Error = ({ message }: { message: string | null }) => {
  if (!message) return null;
  return (
    <Container>
      <Fade in={true}>
        <Alert
          severity="error"
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          {message}
        </Alert>
      </Fade>
    </Container>
  );
};

const Container = styled.div`
  margin: 8px 0px;
`;

export default Error;
