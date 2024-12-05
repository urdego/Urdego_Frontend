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
  const [validationMessage, setValidationMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const checkNicknameDuplicate = async () => {
    if (!nickname) {
      setValidationMessage({
        message: '닉네임을 입력해주세요.',
        type: 'error',
      });
      onNicknameValidated('', false);
      return;
    }

    try {
      const response = await fetch('/api/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result === 'PERMIT') {
          setValidationMessage({
            message: '사용 가능한 닉네임입니다.',
            type: 'success',
          });
          onNicknameValidated(nickname, true);
        } else if (result === 'DUPLICATED') {
          setValidationMessage({
            message: '이미 사용 중인 닉네임입니다.',
            type: 'error',
          });
          onNicknameValidated(nickname, false);
        }
      } else {
        setValidationMessage({
          message: '중복 확인 중 오류가 발생했습니다.',
          type: 'error',
        });
        onNicknameValidated(nickname, false);
      }
    } catch (error) {
      console.error('Nickname check error:', error);
      setValidationMessage({
        message: '중복 확인 중 오류가 발생했습니다.',
        type: 'error',
      });
      onNicknameValidated(nickname, false);
    }
  };

  const handleInputChange = (value: string) => {
    setNickname(value);
    setValidationMessage(null);
    onNicknameValidated(value, false);
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
              <ValidationMessage
                message={validationMessage.message}
                type={validationMessage.type}
              />
            )
          }
        />
      </div>
      <DuplicateCheckButton handleClick={checkNicknameDuplicate} />
    </NickNameWrapper>
  );
};

export default NickNameInput;
