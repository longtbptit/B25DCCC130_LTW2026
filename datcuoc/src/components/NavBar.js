import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const getLinkStyle = ({ isActive }) => ({
    padding: '10px 16px',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderRadius: '4px',
    backgroundColor: isActive ? '#1b5e20' : 'transparent',
    color: isActive ? '#ffffff' : '#333333',
  });

  return (
    <nav style={{ display: 'flex', gap: '12px', padding: '16px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <NavLink to="/" end style={getLinkStyle}>Trang chủ</NavLink>
      <NavLink to="/questions" style={getLinkStyle}>Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history" style={getLinkStyle}>Lịch sử</NavLink>
    </nav>
  );
};

export default NavBar;