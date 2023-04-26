import React from "react";
import { Alert, Fade } from "@mui/material";
import styled from "styled-components";

const Success = ({ message }: { message: string | undefined }) => {
  if (!message) return null;
  return (
    <Container>
      <Fade in={true}>
        <Alert
          severity="success"
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

export default Success;
