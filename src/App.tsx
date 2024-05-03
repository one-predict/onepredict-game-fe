import { createGlobalStyle } from 'styled-components';

import OrbitronRegularFontUrl from './assets/fonts/Orbitron-Regular.woff2';
import OrbitronBoldFontUrl from './assets/fonts/Orbitron-Bold.woff2';
import Menu from './components/Menu/Menu';
import SignIn from './components/SignIn';
import { useState } from 'react';
import Game from './components/Game';
import useSession from './hooks/useSession';

const GlobalStyle = createGlobalStyle`
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
    font-family: 'Orbitron', sans-serif;
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
    font-family: 'Orbitron';
    src: url('${OrbitronRegularFontUrl}') format('woff2'),
    url('${OrbitronRegularFontUrl}') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Orbitron';
    src: url('${OrbitronBoldFontUrl}') format('woff2'),
    url('${OrbitronBoldFontUrl}') format('woff');
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

  const currentUser = useSession();

  const renderSecuredContent = () => {
    if (!currentUser) {
      return null;
    }

    if (startGame) {
      return <Game />;
    }

    return <Menu userBalance={currentUser.balance} onStartGameClick={() => setStageGame(true)} />;
  };

  return (
    <>
      {!currentUser && <SignIn />}
      {currentUser && renderSecuredContent()}
      <GlobalStyle />
    </>
  );
};

export default App;
