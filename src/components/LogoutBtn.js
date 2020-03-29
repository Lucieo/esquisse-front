import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import {useHistory} from 'react-router-dom';

export default function LogoutButton() {
  const client = useApolloClient();
  const history = useHistory();
  return (
    <li
      onClick={() => {
        client.writeData({ data: { isLoggedIn: false, userId: null } });
        localStorage.clear();
        window.location.reload();
        history.push('/');
      }}
    >
        <a>
            Déconnexion
        </a>
    </li>
  );
}