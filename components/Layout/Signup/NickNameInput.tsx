import { useState } from 'react';
import Input from '@/components/Common/Input/Input';
import DuplicateCheckButton from '@layout/Signup/DuplicateCheckButton';
import { NickNameWrapper } from '@layout/Signup/NickNameInput.styles';
import ValidationMessage from '@/components/Common/ValidationMessage/ValidationMessage';

interface NickNameInputProps {
  onNicknameValidated: (nickname: string, isValid: boolean) => void;
}

const NickNameInput = ({ onNicknameValidated }: NickNameInputProps) => {
  const [nickname, setNickname] = useState('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);

  const checkNicknameDuplicate = async () => {
    if (!nickname) {
      setValidationMessage('닉네임을 입력해주세요.');
      onNicknameValidated('', false);
      return;
    }

    setIsChecking(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-service/nickname`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nickname }),
        }
      );

      const result = await response.text();

      if (response.ok) {
        if (result === 'PERMIT') {
          setValidationMessage('사용 가능한 닉네임입니다.');
          onNicknameValidated(nickname, true);
        } else if (result === 'DUPLICATED') {
          setValidationMessage('이미 사용 중인 닉네임입니다.');
          onNicknameValidated(nickname, false);
        }
      } else {
        setValidationMessage('중복 확인 중 오류가 발생했습니다.');
        onNicknameValidated(nickname, false);
      }
    } catch (error) {
      console.error('Nickname check error:', error);
      setValidationMessage('중복 확인 중 오류가 발생했습니다.');
      onNicknameValidated(nickname, false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleInputChange = (value: string) => {
    setNickname(value);
    setValidationMessage('');
    onNicknameValidated(value, false); // 입력값이 변경되면 유효성 초기화
  };

  return (
    <NickNameWrapper>
      <div>
        <Input
          title="닉네임"
          placeholder="5~10자의 영문 혹은 영문+숫자 조합"
          onChange={handleInputChange}
          validation={
            validationMessage && (
              <ValidationMessage message={validationMessage} />
            )
          }
        />
      </div>
      <DuplicateCheckButton handleClick={checkNicknameDuplicate} />
    </NickNameWrapper>
  );
};

export default NickNameInput;
