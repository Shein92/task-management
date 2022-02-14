import styled from "styled-components";

export const Container = styled.div`
  margin: 0 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 240px;
  display: flex;
  flex-direction: column;
  background-color: white;
  flex-grow: 0;
  padding: 10px;
  flex-shrink:0;
`;

export const TaskList = styled.div<{isDraggingOver: boolean}>`
  padding: 8px;
  background-color: ${({isDraggingOver}) =>
    isDraggingOver ? "skyblue" : "inherit"};
`;