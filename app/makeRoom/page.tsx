'use client';

import { useRef } from 'react';
import TopBar from '@/components/Common/TopBar/TopBar';
import { PageWrapper, Footer } from '@/app/makeRoom/makeRoom.styles';
import RoomTitleInput from '@layout/MakeRoom/RoomTitleInput';
import Button from '@common/Button/Button';
import DataListForm from '@layout/MakeRoom/DataListForm';

const MakeRoomPage = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <TopBar NavType="other" label="방 만들기" />
      <PageWrapper>
        <RoomTitleInput
          ref={titleInputRef}
          label="방 제목 설정"
          placeholder="방 제목을 설정해주세요"
        />
        <DataListForm type="people" />
        <DataListForm type="round" />
        <RoomTitleInput
          label="타이머"
          placeholder="1분 (변경불가)"
          variant="readonly"
        />
      </PageWrapper>
      <Footer>
        <Button
          buttonType="gray"
          buttonSize="large"
          buttonHeight="default"
          styleType="coloredBackground"
          label="게임 방 생성"
        />
      </Footer>
    </>
  );
};

export default MakeRoomPage;
