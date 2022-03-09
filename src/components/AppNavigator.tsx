import { FC, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { AppContext } from "../providers/AppProvider";
import "./AppNavigator.css";

const AppNavigator: FC = () => {
  const { user, userItemCount } = useContext(AppContext);

  return (
    <div className="App">
      <header>
        <h2>MyCraft</h2>
      </header>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/crafting">Crafting</Link>
            </li>
            <li>
              <Link to="/my-items">My Items ({userItemCount()})</Link>
            </li>
          </ul>
        </nav>

        <Outlet />
      </div>
    </div>
  );
};

export default AppNavigator;
