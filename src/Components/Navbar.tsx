import './NavarCSS.css';
import { PiCardsFill } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { BsChatSquareTextFill } from "react-icons/bs";
import { RiBrain2Fill } from "react-icons/ri";


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navbar">
      <div
        className={`cards${location.pathname === "/" ? " active" : ""}`}
        onClick={() => navigate('/')}
      >
        <PiCardsFill size={27} />
      </div>
      <div
        className={`chat${location.pathname === "/chatPage" ? " active" : ""}`}
        onClick={() => navigate('/chatPage')}
      >
        <RiBrain2Fill size={24} />
      </div>
    </div>
  );
}

export default Navbar;