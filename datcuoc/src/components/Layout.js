import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;