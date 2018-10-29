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

// NOTE: Using attrs with a style factory fn here because row and col change a lot. This way, new class name will not be generated each time the pixel moves.
const LitPixel = styled.div.attrs({
  style: ({ row, col }) => ({
    gridColumn: col,
    gridRow: row,
  }),
})``;

export const BlackPixel = styled(LitPixel)`
  background-color: black;
`;

export const RedPixel = styled(LitPixel)`
  background-color: red;
`;

export const GreenPixel = styled(LitPixel)`
  background-color: green;
`;
