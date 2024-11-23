'use client';
import TopBar from "@/components/Common/TopBar/TopBar";
import RoomButton from "@/components/Common/RoomButton/RoomButton";
import { PageWrapper } from "../../commonPage.styles";
import { RoomButtonGrid,ListTitle, SubTitle } from './groupList.styles';
import MakeRoom from "@/components/Common/MakeRoom/MakeRoom";

const GroupList = () => {
  const roomButtons = Array.from({ length: 20 }, (_, index) => (
    <RoomButton
      key={index}
      title={`방제목 ${index + 1}`}
      hostUser="유저명"
      groupMemberCount={3}
      maxMemberCount={8}
    />
  ));

  return (
    <>
      <TopBar NavType="other" label="그룹 리스트" />
      <PageWrapper>
      <SubTitle>
          <ListTitle>내가 속한 그룹</ListTitle>
          <MakeRoom/>
      </SubTitle>
        <RoomButtonGrid>
          {roomButtons}
        </RoomButtonGrid>
      </PageWrapper>
    </>
  );
};

export default GroupList;