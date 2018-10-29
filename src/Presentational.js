import styled from 'styled-components';

export const Display = styled.div`
  display: grid;
  width: ${props => props.width * 10}px
  grid-template-columns: repeat(
    ${props => props.width},
    10px
  );
  grid-template-rows: repeat(
    ${props => props.height},
    10px
  );
  border: 5px solid blue;
  margin: 10px;
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
