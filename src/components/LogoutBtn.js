import React from "react";
import { useApolloClient } from "@apollo/react-hooks";

export default function LogoutButton() {
  const client = useApolloClient();
  return (
    <li
      onClick={() => {
        client.writeData({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}
    >
        <a>
            Déconnexion
        </a>
    </li>
  );
}