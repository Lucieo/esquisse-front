import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthPage from 'layouts/AuthPage';
import ConnectedPages from 'layouts/ConnectedPages';
import {
  BrowserView,
  MobileView,
  isIE
} from "react-device-detect";
import NoMobile from 'components/NoMobile';
import NoInternetExplorer from 'components/NoInternetExplorer'


function IsLoggedIn() {
  return localStorage.getItem('esquisse-token') ? <ConnectedPages/> : <AuthPage/>;
}

const Root = () => {
  if(isIE) return  <NoInternetExplorer/>
  return (
      <>
        <BrowserView>
          <IsLoggedIn />
        </BrowserView>
        <MobileView>
            <NoMobile/>
        </MobileView>
      </>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
