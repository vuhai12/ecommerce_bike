import styled from "styled-components";

export const Wrapper = styled.div<{ contentWidth: number }>`
  font-size: 14px;
  width: ${({ contentWidth }) => contentWidth}px;
  margin-left: calc(50% - ${({ contentWidth }) => contentWidth / 2}px);
`;

export const Container = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  gap: 50px;
  z-index: 99;
`;
