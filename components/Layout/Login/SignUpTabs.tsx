import {
  TabContainer,
  TabDivider,
  TabItem,
} from '@layout/Login/SignUpTabs.styles';

interface SignupTabsProps {
  handleTabClick: (tab: 'id' | 'password' | 'signup') => void;
}

const SignupTabs = ({ handleTabClick }: SignupTabsProps) => {
  return (
    <TabContainer>
      <TabItem onClick={() => handleTabClick('id')}>아이디 찾기</TabItem>
      <TabDivider />
      <TabItem onClick={() => handleTabClick('password')}>
        비밀번호 찾기
      </TabItem>
      <TabDivider />
      <TabItem onClick={() => handleTabClick('signup')}>회원가입</TabItem>
    </TabContainer>
  );
};

export default SignupTabs;
