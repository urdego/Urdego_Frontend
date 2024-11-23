"use client";
import TopBar from "@/components/Common/TopBar/TopBar";
import { PageWrapper } from "../(nav)/commonPage.styles"

const MakeRoomPage = () => {
  return (
    <>
    <TopBar NavType="other" label="방 만들기" />
    <PageWrapper>
        <h2>방만들기 페이지</h2>
    </PageWrapper>
    </>
  );
}
export default MakeRoomPage;