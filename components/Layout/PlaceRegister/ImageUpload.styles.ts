import colors from '@/styles/color/palette';
import styled from 'styled-components';

export const ImageUploadWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 4px;
  border: 1px solid ${colors.etc.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
`;

export const ImageUploadContainer = styled.div`
  text-align: center;
  padding: 4px 8px;
`;

export const ImageUploadInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const ImageUploadCount = styled.div`
  color: ${colors.etc.black};
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
`;
