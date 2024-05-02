import { createGlobalStyle } from "styled-components";
import { useProfile } from "@farcaster/auth-kit";

import GothamProRegularFontUrl from "./assets/fonts/GothamPro.woff2";
import GothamProBoldFontUrl from "./assets/fonts/GothamPro-Bold.woff2";
import Menu from "./components/Menu/Menu.tsx";
import SignIn from "./components/SignIn";
import {useState} from "react";
import Game from "./components/Game";
import PortfolioRouter from "./pages/portfolio/page"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  * {
    margin: 0;
  }
  
  html {
    font-size: 16px;
  }
  
  body, html {
    height: 100%;
    width: 100%;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  
  body {
    overflow-x: hidden;
    font-family: 'Gotham Pro', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  
  #root {
    isolation: isolate;
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100%;
    width: 100%;
    max-width: unset;
  }

  @font-face {
    font-family: 'Gotham Pro';
    src: url('${GothamProRegularFontUrl}') format('woff2'),
    url('${GothamProRegularFontUrl}') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham Pro';
    src: url('${GothamProBoldFontUrl}') format('woff2'),
    url('${GothamProBoldFontUrl}') format('woff');
    font-weight: bold;
    font-style: normal;
  }
  
  .fc-authkit-qrcode-dialog {
    position: fixed;
    top: 0;
  }
`;

const App = () => {
  const [startGame, setStageGame] = useState(false);
  const [portfolio, setOpenPortfolio] = useState<boolean>(false);
  const { isAuthenticated, profile } = useProfile();

  const renderSecuredContent = () => {
    if (startGame) {
      return (
        <Game />
      );
    }

    if(portfolio) {
      return (
          <PortfolioRouter />
      )
    }

    return (
      <Menu
          onOpenPortfolio={() => setOpenPortfolio(true)}
        onStartGameClick={() => setStageGame(true)}
        username={profile.username || 'Unknown Picker'}
      />
    );
  };

  return (
    <>
      {!isAuthenticated && <SignIn />}
      {isAuthenticated && renderSecuredContent()}
      <GlobalStyle />
    </>
  )
}

export default App;
