import styled from "styled-components";

export const PopupWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(236, 236, 236, 0.7);
`;

export const Popup = styled.div`
  width: 500px;
  padding: 25px 20px;
  border-radius: 8px;
  background: white;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DescriptionTextWrapper = styled.div`
  margin-bottom: 10px;
`;
