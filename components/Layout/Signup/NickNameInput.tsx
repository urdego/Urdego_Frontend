import Input from '@/components/Common/Input/Input';
import DuplicateCheckButton from '@layout/Signup/DuplicateCheckButton';
import { NickNameWrapper } from './NickNameInput.styles';

const NickNameInput = () => {
  const handleClick = () => {
    alert('중복확인');
  };

  return (
    <NickNameWrapper>
      <div>
        {' '}
        <Input title="닉네임" placeholder="5~10자의 영문 혹은 영문+숫자 조합" />
      </div>
      <DuplicateCheckButton handleClick={handleClick} />
    </NickNameWrapper>
  );
};

export default NickNameInput;
