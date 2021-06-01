import { useEffect, useState } from "react";

//components
import { Nav, NavItem, NavLink, Row, Col } from "react-bootstrap";
//const
import { USER_TABS } from "./const";

export interface ProfileNavProps {
  onChange: (activeTab: string) => void;
}

const ProfileNav: React.SFC<ProfileNavProps> = ({ children, onChange }) => {
  const [activeTab, setActiveTab] = useState<string>(USER_TABS.COLLECTION);

  const toggle = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (onChange) {
        onChange(tab);
      }
    }
  };

  useEffect(() => {
    setActiveTab(USER_TABS.COLLECTION);

    if (onChange) {
      onChange(USER_TABS.COLLECTION);
    }
  }, [onChange]);

  return (
    <Nav
      variant="pills"
      defaultActiveKey="#/action-1"
      className="justify-content-center mb-2 flex-column"
    >
      <NavItem>
        <NavLink
          href="#/action-1"
          onClick={() => {
            toggle(USER_TABS.COLLECTION);
          }}
        >
          <div className="w-100 p-0">
            <h4 className="m-0">COLLECTION</h4>
          </div>
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="#/action-2"
          onClick={() => {
            toggle(USER_TABS.EDIT);
          }}
        >
          <div className="w-100 p-0">
            <h4 className="m-0">EDIT</h4>
          </div>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="#/action-3"
          onClick={() => {
            toggle(USER_TABS.COM_CRIT);
          }}
        ></NavLink>
      </NavItem>
    </Nav>
  );
};

export default ProfileNav;
