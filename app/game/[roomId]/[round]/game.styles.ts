import styled from 'styled-components';
import colors from '@/styles/color/palette';

export const PageWrapper = styled.div`
  background-color: ${colors.etc.white};
  width: 100%;
  box-sizing: border-box;
  align-items: center;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  min-width: 375px;
  max-width: 430px;
  padding: 12px 16px;
  background-color: ${colors.etc.white};
  box-shadow: 0px -4px 24px rgba(0, 0, 0, 0.1);
`;

export const HintText = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.16px;
  color: ${colors.etc.black};
  text-align: center;

  background: ${colors.gray[90]};
  padding: 8px 12px;
  border-radius: 8px;
`;

export const HintWrapper = styled.div`
  display: flex;
  max-height: 64px;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

export const AnswerAddress = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 4px 16px;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.etc.white};

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
`;

export const PlaceName = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.12px;
  color: ${colors.gray[60]};
  text-align: center;
  text-overflow: ellipsis;
`;

export const PlaceAddress = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.12px;
  color: ${colors.gray[60]};
  text-align: center;
  text-overflow: ellipsis;
`;
