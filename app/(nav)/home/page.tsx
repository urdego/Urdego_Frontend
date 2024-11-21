"use client"
import TopBar from "@/components/Aommon/TopBar/TopBar";
import { MainBanner } from "@/components/Layout/MainBanner/MainBanner";
const Home = () => {
  return (
    <>
      <TopBar NavType="main"/>
      <MainBanner/>
      <h1>Home</h1>
    </>
  );
};

export default Home;