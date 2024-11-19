import Input from "@/components/Input/Input";
import DuplicateCheckButton from "./DuplicateCheckButton";
import { NickNameWrapper } from "./NickNameInput.styles";

const NickNameInput = () => {
  const handleClick = () => {
    alert("중복확인");
  };
  return (
    <NickNameWrapper>
      <Input title="닉네임" placeholder="5~10자의 영문 혹은 영문+숫자 조합" />
      <DuplicateCheckButton handleClick={handleClick} />
    </NickNameWrapper>
  );
};

export default NickNameInput;
