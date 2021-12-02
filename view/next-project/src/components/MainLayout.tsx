import Header from "@components/Header"

type LayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main>{ children }</main>
    </>
  );
}

export default MainLayout;
