# 🗺️ 어데고?! - 위치 추적 게임 서비스


<img width="5760" height="3240" alt="1new" src="https://github.com/user-attachments/assets/c1cd4e85-2023-4c5d-b701-4262a82e9eac" />

<div align=center>
<a href="https://urdego.vercel.app/">어데고?! 서비스 바로가기</a><Br/><Br/>
</div>

## ✨ 멤버 소개

<div align="center">
  
| <img src="https://github.com/bluedog129.png" width="150" > | <img src="https://github.com/aaahyesu.png" width="150" > | <img src="https://github.com/minjeongss.png" width="150" > |
| :--------------------------------------------: | :------------------------------------------: | :--------------------------------------------: |
|    [최효종](https://github.com/bluedog129)     |     [김혜수](https://github.com/aaahyesu)     |    [김민정](https://github.com/minjeongss)     |
|     PM, User-Service, Notification-Service     |              팀장, Game-Service              |         Content-Service, User-Service          |

</div>

## 📅 프로젝트 진행 과정

### 1차 MVP 기간

- **기획기간** : 2024.10.21 ~ 2024.11.18
- **개발기간** : 2024.11.19 ~ 2024.12.09

### 2차 MVP 기간

- **기획기간** : 2024.12.18 ~ 2024.12.23
- **개발기간** : 2025.01.02 ~ 2025.03.14


## 🎯 기능 소개
<img width="7680" height="4320" alt="2" src="https://github.com/user-attachments/assets/deeef220-950e-4f42-8ba4-5e2d200a65db" />
<img width="7680" height="4320" alt="3" src="https://github.com/user-attachments/assets/c9e69b8f-2365-49a8-94ec-1975115d0eb8" />

![4페이지](https://github.com/user-attachments/assets/77d75dc3-8aca-4835-bc9d-a6fd00bb4a1f)
![5페이지](https://github.com/user-attachments/assets/aa39ce50-8543-453d-8650-3c29f75d8082)

<img width="7680" height="4320" alt="6" src="https://github.com/user-attachments/assets/657206e6-79e3-46c8-9aa9-698d06045541" />
<img width="7680" height="4320" alt="7" src="https://github.com/user-attachments/assets/ba82314e-c89d-4811-ae40-8303db4e4c88" />
<img width="7680" height="4320" alt="8" src="https://github.com/user-attachments/assets/879298de-0214-42da-9fca-0ccaf7bc21db" />

![9페이지](https://github.com/user-attachments/assets/71a8c3bd-9b86-4577-a5be-61963034f3af)
![10페이지](https://github.com/user-attachments/assets/3857dd53-9c4b-489c-8fc7-9cbd2cd60ffa)


## 🛠️ 기술 스택

### Node.js Version

`v20.15.0` (LTS version as of 2024.07.01)

<br />

| 역할                 | 종류                                                                                                                                                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)                            |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                                  |
| Styling              | ![Styled-Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)                                                                                                 |
| Data Fetching        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white)                      |
| State Management     | ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)             |
| 3D Graphics          | ![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white) ![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-000000?style=for-the-badge&logo=react&logoColor=white) |
| Formatting           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)                      |
| Package Manager      | ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)                                                                                                                                        |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)                       |

### 🛠️ Architecture

<img src="./public/Urdergo_Architecture.png" width="800">


## 🗂️ 프로젝트 폴더 구조

<details>
<summary>📁 폴더 구조 보기</summary>

```
Urdego_Frontend/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (auth)/                   # 인증 관련 페이지
│   │   └── 📁 login/                # 로그인 페이지
│   ├── 📁 (nav)/                    # 네비게이션 포함 페이지
│   │   ├── 📁 content/              # 컨텐츠 관련
│   │   │   └── 📁 register/         # 컨텐츠 등록
│   │   ├── 📁 home/                 # 홈 페이지
│   │   ├── 📁 myPage/               # 마이페이지
│   │   │   ├── 📁 accountCencellation/  # 계정 탈퇴
│   │   │   ├── 📁 nicknameChange/   # 닉네임 변경
│   │   │   ├── 📁 passwordChange/   # 비밀번호 변경
│   │   │   └── 📁 simpleLoginSetting/    # 간편 로그인 설정
│   │   └── 📁 rank/                 # 랭킹 페이지
│   ├── 📁 api/                      # API 라우트
│   │   ├── 📁 auth/                 # 인증 API
│   │   ├── 📁 character/            # 캐릭터 API
│   │   ├── 📁 content/              # 컨텐츠 API
│   │   ├── 📁 game/                 # 게임 API
│   │   ├── 📁 login/                # 로그인 API
│   │   ├── 📁 makeRoom/             # 방 생성 API
│   │   ├── 📁 nickname/             # 닉네임 API
│   │   ├── 📁 notification-service/ # 알림 서비스 API
│   │   ├── 📁 signup/               # 회원가입 API
│   │   ├── 📁 userInfo/             # 사용자 정보 API
│   │   ├── 📁 userSearch/           # 사용자 검색 API
│   │   └── 📁 waitingRoomList/      # 대기방 목록 API
│   ├── 📁 components/               # 앱 레벨 컴포넌트
│   ├── 📁 content/                  # 컨텐츠 페이지
│   ├── 📁 game/                     # 게임 관련 페이지
│   │   └── 📁 [roomId]/             # 게임방
│   │       ├── 📁 [round]/          # 게임 라운드
│   │       └── 📁 waitingRoom/      # 대기방
│   └── 📁 waitingRoomList/          # 대기방 목록 페이지
├── 📁 components/                   # 공통 컴포넌트
│   ├── 📁 Common/                   # 공통 UI 컴포넌트
│   │   ├── 📁 AlertModal/           # 알림 모달
│   │   ├── 📁 BottomSheet/          # 바텀시트
│   │   ├── 📁 Button/               # 버튼
│   │   ├── 📁 Input/                # 입력 필드
│   │   ├── 📁 LoadingSpinner/       # 로딩 스피너
│   │   ├── 📁 Lottie/               # 로티 애니메이션
│   │   ├── 📁 NavBar/               # 네비게이션 바
│   │   ├── 📁 SearchBar/            # 검색바
│   │   ├── 📁 Skeleton/             # 스켈레톤 UI
│   │   ├── 📁 Toast/                # 토스트 메시지
│   │   └── 📁 TopBar/               # 상단 바
│   └── 📁 Layout/                   # 레이아웃 컴포넌트
│       ├── 📁 AddContents/          # 컨텐츠 추가
│       ├── 📁 ContentRegister/      # 컨텐츠 등록
│       ├── 📁 Contents/             # 컨텐츠 목록
│       ├── 📁 Game/                 # 게임 관련
│       ├── 📁 Home/                 # 홈 관련
│       ├── 📁 InviteUser/           # 사용자 초대
│       ├── 📁 LocationRegister/     # 위치 등록
│       ├── 📁 Login/                # 로그인
│       ├── 📁 MakeRoom/             # 방 생성
│       ├── 📁 MyPage/               # 마이페이지
│       ├── 📁 TipModal/             # 팁 모달
│       └── 📁 WaitingRoom/          # 대기방
├── 📁 config/                       # 설정 파일
├── 📁 hooks/                        # 커스텀 훅
│   ├── 📁 bottomSheet/              # 바텀시트 훅
│   ├── 📁 character/                # 캐릭터 관련 훅
│   ├── 📁 contentRegister/          # 컨텐츠 등록 훅
│   ├── 📁 contents/                 # 컨텐츠 관련 훅
│   ├── 📁 inGame/                   # 게임 중 훅
│   ├── 📁 Loading/                  # 로딩 관련 훅
│   ├── 📁 modal/                    # 모달 관련 훅
│   ├── 📁 waitingRoomList/          # 대기방 목록 훅
│   └── 📁 websocket/                # 웹소켓 훅
├── 📁 lib/                          # 라이브러리 및 유틸리티
│   ├── 📁 auth/                     # 인증 관련
│   └── 📁 types/                    # TypeScript 타입 정의
├── 📁 public/                       # 정적 파일
│   ├── 📁 Character/                # 캐릭터 이미지
│   ├── 📁 Icon/                     # 아이콘
│   ├── 📁 music/                    # 음악 파일
│   ├── 📁 Screenshots/              # 스크린샷
│   └── 📁 Splash/                   # 스플래시 화면
├── 📁 stores/                       # 상태 관리 (Zustand)
├── 📁 stories/                      # Storybook 스토리
├── 📁 styles/                       # 스타일 관련
│   ├── 📁 color/                    # 색상 팔레트
│   ├── 📁 fonts/                    # 폰트 파일
│   ├── 📁 Icon/                     # 스타일 아이콘
│   ├── 📁 Image/                    # 이미지 파일
│   └── 📁 lottie/                   # 로티 파일
├── 📄 package.json                  # 프로젝트 의존성
├── 📄 next.config.mjs              # Next.js 설정
├── 📄 tsconfig.json                # TypeScript 설정
├── 📄 .eslintrc.json               # ESLint 설정
├── 📄 .prettierrc                  # Prettier 설정
└── 📄 README.md                    # 프로젝트 문서
```

</details>

## 🔧 기능 개선 문서

서비스 개선을 위해 진행된 주요 기능 개선사항을 정리한 문서입니다.  
팀 내 회고를 바탕으로 실질적인 문제를 해결하고, 사용자 경험을 더 향상시키고자 시도한 과정을 담았습니다.

📄 **기능 개선 문서 전체 보기** 👉 [바로가기](https://witty-crime-33b.notion.site/22fbba7341bd818e9cf3c5dff17f3586?source=copy_link)
