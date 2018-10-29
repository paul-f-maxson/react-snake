import styled from "styled-components";

export const Display = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 10px);
  grid-template-rows: repeat(10, 10px);
`;

const LitPixel = styled.div`
  grid-column: ${props => props.col};
  grid-row: ${props => props.row};
`;

export const BlackPixel = styled(LitPixel)`
  background-color: black;
`;

export const RedPixel = styled(LitPixel)`
  background-color: red;
`;
