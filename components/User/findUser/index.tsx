import React, { FC, useEffect, useState } from "react";
//COMPONENTS
import {
  Tabs,
  Tab,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useAuth } from "../../../firebase/AuthContext";
import styles from "./findUser.module.scss";
export interface findUserProps {}

const findUser: React.SFC<findUserProps> = () => {
  const { getUsersByUserName } = useAuth();

  const [find, setFind] = useState("");
  const [users, setUsers] = useState([]);

  const change = (data: any) => {
    setFind(data.target.value);
  };

  useEffect(() => {
    async function fetchDataUsers() {
      const response = await getUsersByUserName(find);
      setUsers(response);
    }
    fetchDataUsers();
  }, [find]);
  return (
    <div>
      <InputGroup className="mb-3 mt-4">
        <FormControl
          placeholder="Seach User"
          aria-label="Seach User"
          aria-describedby="basic-addon2"
          onChange={change}
        />
      </InputGroup>
      <div className={styles.users}>
        {users.map((u) => {
          <p>{u.userName}</p>;
        })}
      </div>
    </div>
  );
};

export default findUser;
