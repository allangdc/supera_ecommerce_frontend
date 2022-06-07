import { Paper } from "@mui/material";
import styled from "styled-components";

export const PaperDiv = styled(Paper)`
  max-width: 450px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
