import { NavLink } from "react-router-dom";

const Tab = ({ tabs }) => {
  return (
    <div className="tabs">
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.url}
            className={({ isActive }) =>
              "tab-button " + (isActive ? "activeTab" : "")
            }
          >
            {tab.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Tab;
