'use client';

import { useState, useCallback } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import Button from '@common/Button/Button';
import CheckboxOption from '@common/CheckboxOption/CheckboxOption';
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

const AccountCancellation = () => {
  const [reasons, setReasons] = useState({
    gameDislike: false,
    inconvenience: false,
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
      reasons.inconvenience ||
      (reasons.other && isValid)); // 🔥 10자 이상 입력해야 버튼 활성화

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
        <CheckboxOption
          label="게임이 마음에 들지 않아요."
          onChange={(checked) => handleReasonChange('gameDislike')(checked)}
        />
        <CheckboxOption
          label="게임이 너무 어렵거나/너무 쉬워요."
          onChange={(checked) => handleReasonChange('inconvenience')(checked)}
        />
        <CheckboxOption
          label="이용이 불편하고 장애가 많아요."
          onChange={(checked) => handleReasonChange('inconvenience')(checked)}
        />
        <CheckboxOption
          label="소셜 기능이 부족해요"
          onChange={(checked) => handleReasonChange('inconvenience')(checked)}
        />
        <CheckboxOption
          label="기타"
          isChecked={reasons.other}
          onChange={(checked) => handleReasonChange('other')(checked)}
        />
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
          onClick={() => {
            console.log('탈퇴 이유:', reasons, '기타 사유:', otherReason);
          }}
        />
      </Footer>
    </>
  );
};

export default AccountCancellation;
