import styled from 'styled-components';

export const LoadingOverlay = styled.div<{ $isLocationRegister?: boolean }>`
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  min-height: ${(props) =>
    props.$isLocationRegister ? 'calc(100vh - 192px)' : '100vh'};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(26, 28, 28, 0.9);
  backdrop-filter: blur(0.8px);
  z-index: 9999;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
