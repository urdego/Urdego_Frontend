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
} from '@/app/(nav)/myPage/accountCencellation/accountCencellation.styles';

const AccountCancellation = () => {
  const [reasons, setReasons] = useState({
    gameDislike: false,
    inconvenience: false,
    other: false,
  });
  const [otherReason, setOtherReason] = useState(''); // '기타' 이유 입력값
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleReasonChange = useCallback(
    (reason: keyof typeof reasons) => (checked: boolean) => {
      setReasons((prev) => {
        const updatedReasons = { ...prev, [reason]: checked };

        // '기타' 체크 해제 시 입력 필드 초기화
        if (reason === 'other' && !checked) {
          setOtherReason('');
        }

        return updatedReasons;
      });
    },
    []
  );

  const canSubmit =
    isConfirmed &&
    (reasons.gameDislike ||
      reasons.inconvenience ||
      (reasons.other && otherReason.trim().length > 0));

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
          label="이용이 불편하고 장애가 많아요."
          onChange={(checked) => handleReasonChange('inconvenience')(checked)}
        />
        <CheckboxOption
          label="기타"
          isChecked={reasons.other}
          onChange={(checked) => handleReasonChange('other')(checked)}
        />

        {/* '기타' 체크 시 입력 필드 표시 */}
        {reasons.other && (
          <TextareaWrapper>
            <StyledTextarea
              placeholder="탈퇴사유를 적어주시면 감사하겠습니다. 더 노력하는 '어데고'가 되겠습니다! (최대 100자 이내로 적어주시면 감사하겠습니다)"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
            />
          </TextareaWrapper>
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
