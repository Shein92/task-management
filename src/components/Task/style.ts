import styled from "styled-components";

export const Container = styled.div<{isDragging: boolean}>`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${({isDragging}) => (isDragging ? "lightgreen" : "white")};
`;