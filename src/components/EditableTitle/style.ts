import styled from "styled-components";

interface ITitleWrapper {
  isColumnTitle?: boolean;
}

export const TitleWrapper = styled.div<ITitleWrapper>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ isColumnTitle = false }) =>
    isColumnTitle ? "22px" : "18px"};
  font-weight: ${({ isColumnTitle = false }) => (isColumnTitle ? 600 : 400)};
`;
