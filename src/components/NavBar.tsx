import {FC} from 'react';
import {Link} from "react-router-dom";

const NavBar: FC = () => {
   return (
      <nav className="navbar">
         <img className='pexels' src="https://images.pexels.com/lib/api/pexels.png" alt="logotype"/>
         <ul>
            <li>
               <Link to="/">Home</Link>
            </li>
            <li>
               <Link to="/image">Image</Link>
            </li>
            <li>
               <Link to="/video">Video</Link>
            </li>
         </ul>
      </nav>
   );
};

export default NavBar;