import NavBar from "../../components/Common/NavBar/NavBar";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <NavBar />
    </div>
  );
}
