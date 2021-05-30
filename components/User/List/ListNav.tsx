import { useEffect, useState } from "react";

//components
import { Nav, NavItem, NavLink, Row, Col } from "react-bootstrap";
//const
import { LIST_TABS } from "./const";

export interface ListNavProps {
  onChange: (activeTab: string) => void;
}

const ListNav: React.SFC<ListNavProps> = ({ children, onChange }) => {
  const [activeTab, setActiveTab] = useState<string>(LIST_TABS.MOVIE);

  const toggle = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (onChange) {
        onChange(tab);
      }
    }
  };

  useEffect(() => {
    setActiveTab(LIST_TABS.MOVIE);

    if (onChange) {
      onChange(LIST_TABS.MOVIE);
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
            toggle(LIST_TABS.MOVIE);
          }}
        >
          <div className="w-100 p-0">
            <h4 className="m-0">Movie</h4>
          </div>
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="#/action-2"
          onClick={() => {
            toggle(LIST_TABS.TV);
          }}
        >
          <div className="w-100 p-0">
            <h4 className="m-0">TV</h4>
          </div>
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          href="#/action-3"
          onClick={() => {
            toggle(LIST_TABS.COLLECTION);
          }}
        >
          <div className="w-100 p-0">
            <h4 className="m-0">Collection</h4>
          </div>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default ListNav;
