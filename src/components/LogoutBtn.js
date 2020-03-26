import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import {useHistory} from 'react-router-dom';

export default function LogoutButton() {
  const client = useApolloClient();
  const history = useHistory();
  return (
    <li
      onClick={() => {
        client.writeData({ data: { isLoggedIn: false } });
        localStorage.clear();
        history.push('/')
      }}
    >
        <a>
            Déconnexion
        </a>
    </li>
  );
}