import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
const Header = () => {
  return <header>hello</header>;
};
export default Layout;
