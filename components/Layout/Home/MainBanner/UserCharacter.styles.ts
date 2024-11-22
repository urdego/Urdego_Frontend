import styled from "styled-components";
import Image from 'next/image';

export const StyledImage = styled(Image)`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
`;