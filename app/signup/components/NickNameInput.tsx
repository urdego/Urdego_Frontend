import Input from "@/components/Input/Input";
import DuplicateCheckButton from "./DuplicateCheckButton";
import { NickNameWrapper } from "./NickNameInput.styles";

const NickNameInput = () => {
  return (
    <NickNameWrapper>
      <Input title="닉네임" placeholder="5~10자의 영문 혹은 영문+숫자 조합" />
      <DuplicateCheckButton />
    </NickNameWrapper>
  );
};

export default NickNameInput;
