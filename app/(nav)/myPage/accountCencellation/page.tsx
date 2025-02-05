'use client';

import { useState, useCallback, useEffect } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@common/Button/Button';
import CheckboxOption from '@common/CheckboxOption/CheckboxOption';
import useUserStore from '@/stores/useUserStore';
import {
  SessionWrapper,
  SubTitle,
  DetailText,
  Footer,
  BigCheckboxWrapper,
  TextareaWrapper,
  StyledTextarea,
  Separator,
  CharCount,
} from '@/app/(nav)/myPage/accountCencellation/accountCencellation.styles';
import { signOut } from 'next-auth/react';

type ReasonType =
  | 'gameDislike'
  | 'difficulty'
  | 'inconvenience'
  | 'social'
  | 'other';

const AccountCancellation = () => {
  // store에서 값 가져오기
  const userId = useUserStore((state) => state.userId);
  const nickname = useUserStore((state) => state.nickname);

  useEffect(() => {
    console.log('탈퇴 페이지 - 유저 스토어 정보:', { userId, nickname });
  }, [userId, nickname]);

  const withdrawReasons = [
    { id: 'gameDislike' as ReasonType, label: '게임이 마음에 들지 않아요.' },
    {
      id: 'difficulty' as ReasonType,
      label: '게임이 너무 어렵거나/너무 쉬워요.',
    },
    {
      id: 'inconvenience' as ReasonType,
      label: '이용이 불편하고 장애가 많아요.',
    },
    { id: 'social' as ReasonType, label: '소셜 기능이 부족해요' },
    { id: 'other' as ReasonType, label: '기타' },
  ];

  const [reasons, setReasons] = useState({
    gameDislike: false,
    difficulty: false,
    inconvenience: false,
    social: false,
    other: false,
  });
  const [otherReason, setOtherReason] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleReasonChange = useCallback(
    (reason: keyof typeof reasons) => (checked: boolean) => {
      setReasons((prev) => {
        const updatedReasons = { ...prev, [reason]: checked };

        if (reason === 'other' && !checked) {
          setOtherReason('');
        }

        return updatedReasons;
      });
    },
    []
  );

  const hasText = otherReason.trim().length > 0;
  const charCount = otherReason.length;
  const isValid = charCount >= 10; // 10자 이상 입력해야 유효

  const canSubmit =
    isConfirmed &&
    (reasons.gameDislike ||
      reasons.difficulty ||
      reasons.inconvenience ||
      reasons.social ||
      (reasons.other && isValid)); // 🔥 10자 이상 입력해야 버튼 활성화

  const getSelectedReasons = () => {
    const selectedLabels = withdrawReasons
      .filter(({ id }) => reasons[id])
      .map(({ label }) => label);

    if (reasons.other && otherReason) {
      selectedLabels.push(otherReason);
    }

    return selectedLabels.join(', ');
  };

  const handleWithdraw = async () => {
    try {
      const requestData = {
        withDrawalReason: getSelectedReasons(),
      };

      // API 라우트를 통해 탈퇴 처리
      const response = await fetch('/api/auth/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...requestData,
        }),
      });

      if (!response.ok) {
        throw new Error('회원 탈퇴 실패');
      }

      // signOut의 콜백으로 리다이렉션 처리
      await signOut({
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('회원 탈퇴 중 에러:', error);
    }
  };

  return (
    <>
      <TopBar NavType="default" label="회원탈퇴" />
      <SessionWrapper>
        <SubTitle>정말 탈퇴하시겠습니까?</SubTitle>
        <DetailText>
          회원 탈퇴 시<br /> • 본 절차는 회원 탈퇴 절차이며 소셜 로그인 계정과의
          연동이 해제됩니다. (소셜 로그인 계정 자체는 영향을 받지 않으며, 해당
          소셜 계정은 그대로 유지됩니다.)
        </DetailText>
        <DetailText>
          • 프로필, 업로드한 장소 및 사진 등 모든 정보가 삭제되며 재가입 시
          복구가 불가능합니다.
        </DetailText>
      </SessionWrapper>
      <Separator />
      <SessionWrapper>
        <SubTitle>탈퇴하시는 이유가 궁금해요.</SubTitle>
        {withdrawReasons.map(({ id, label }) => (
          <CheckboxOption
            key={id}
            label={label}
            isChecked={reasons[id]}
            onChange={(checked) => handleReasonChange(id)(checked)}
          />
        ))}
        {reasons.other && (
          <>
            <TextareaWrapper $hasText={hasText} $isActive={isActive}>
              <StyledTextarea
                placeholder="탈퇴사유를 알려주시면 고객님의 소중한 피드백을 반영해 더 나은 게임 환경을 제공하도록 하겠습니다."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
              />
            </TextareaWrapper>
            {/* 🔥 "0/10자 이상" 글자 수 카운트 UI */}
            <CharCount $isValid={isValid}>{charCount}/10자 이상</CharCount>
          </>
        )}
      </SessionWrapper>

      <BigCheckboxWrapper>
        <CheckboxOption
          label="위 유의사항을 모두 확인하였고, 탈퇴를 진행합니다."
          size="big"
          onChange={setIsConfirmed}
        />
      </BigCheckboxWrapper>

      <Footer>
        <Button
          label="회원탈퇴"
          buttonType={canSubmit ? 'purple' : 'gray'}
          disabled={!canSubmit}
          onClick={handleWithdraw}
        />
      </Footer>
    </>
  );
};

export default AccountCancellation;
