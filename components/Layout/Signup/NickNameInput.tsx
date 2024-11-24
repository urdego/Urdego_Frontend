// NickNameInput.tsx
import { useState } from 'react';
import Input from '@/components/Common/Input/Input';
import DuplicateCheckButton from '@layout/Signup/DuplicateCheckButton';
import { NickNameWrapper } from './NickNameInput.styles';
import ValidationMessage from '@/components/Common/ValidationMessage/ValidationMessage';

interface NickNameCheckResponse {
  status: number;
  data: 'PERMIT' | 'DUPLICATED';
}

const NickNameInput = () => {
  const [nickname, setNickname] = useState('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);

  const validateNickname = (value: string) => {
    const nicknameRegex = /^[A-Za-z][A-Za-z0-9]{4,9}$/;
    return nicknameRegex.test(value);
  };

  const checkNicknameDuplicate = async () => {
    if (!nickname) {
      setValidationMessage('닉네임을 입력해주세요.');
      return;
    }

    if (!validateNickname(nickname)) {
      setValidationMessage(
        '닉네임은 5~10자의 영문 혹은 영문+숫자 조합이어야 합니다.'
      );
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
        } else if (result === 'DUPLICATED') {
          setValidationMessage('이미 사용 중인 닉네임입니다.');
        }
      } else {
        setValidationMessage('중복 확인 중 오류가 발생했습니다.');
        console.error('Server error:', response.status);
      }
    } catch (error) {
      setValidationMessage('중복 확인 중 오류가 발생했습니다.');
      console.error('Network error:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleInputChange = (value: string) => {
    setNickname(value);
    setValidationMessage('');
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
