import styled from "styled-components";

export const Wrapper = styled.div<{ contentWidth: number }>`
  background-color: #23272f;
  font-size: 14px;
  padding-top: 100px;
  width: ${({ contentWidth }) => contentWidth}px;
  margin-left: calc(50% - ${({ contentWidth }) => contentWidth / 2}px);
`;

export const Container = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
`;
