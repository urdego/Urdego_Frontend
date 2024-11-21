import {
  TabContainer,
  TabDivider,
  TabItem,
} from '@layout/Login/SignUpTabs.styles';

import { useRouter } from 'next/navigation';

type TabPath = '/find-id' | '/find-password' | '/signup';

const SignupTabs = () => {
  const router = useRouter();

  const handleTabClick = (path: TabPath) => {
    router.push(path);
  };

  return (
    <TabContainer>
      <TabItem onClick={() => handleTabClick('/find-id')}>아이디 찾기</TabItem>
      <TabDivider />
      <TabItem onClick={() => handleTabClick('/find-password')}>
        비밀번호 찾기
      </TabItem>
      <TabDivider />
      <TabItem onClick={() => handleTabClick('/signup')}>회원가입</TabItem>
    </TabContainer>
  );
};

export default SignupTabs;
