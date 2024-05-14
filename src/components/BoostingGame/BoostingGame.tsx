import Webcam from 'react-webcam';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import BoostingGameStatus from '@app/enums/BoostingGameStatus';
import BoostingGameManager from '@boosting-game/BoostingGameManager';
import CanvasGameDrawer from '@boosting-game/drawing/canvas/CanvasGameDrawer';
import Typography from '@components/Typography';
import Modal from '@components/Modal';
import MintNft from '@components/MintNft';

export interface BoostingGameProps {
  onClose: () => void;
}

const StyledGameLayout = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100%;
`;

const StyledWebcam = styled(Webcam)`
  transform: scaleX(-1);
`;

const OpacityKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  
  50% {
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`;

const StyledInitializationOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0);
`;

const InitializationInProgressTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.white};
  animation: ${OpacityKeyframes} 1.5s infinite;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 9;
  width: 0;
  height: 0;
`;

const BoostingGame = ({ onClose }: BoostingGameProps) => {
  const webcamRef = useRef<Webcam>(null!);
  const canvasRef = useRef(null);

  const [initialized, setInitialized] = useState(false);

  const [finished, setFinished] = useState(false);
  const [finishedScore, setFinishedScore] = useState(0);

  const [, setGameManager] = useState<BoostingGameManager | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current as unknown as HTMLCanvasElement;
    const videoElement = webcamRef.current.video!;

    const canvasContext = canvasElement.getContext('2d');

    if (!canvasContext) {
      throw new Error('Cannot find canvas 2D context.');
    }

    const gameManager = new BoostingGameManager(videoElement);
    const gameDrawer = new CanvasGameDrawer(canvasContext);

    const unsubscribeTickEvent = gameManager.subscribe('tick', (game) => {
      const [gameWindowWidth, gameWindowHeight] = game.getDimensions();

      canvasElement.width = gameWindowWidth;
      canvasElement.height = gameWindowHeight;

      canvasElement.style.width = gameWindowWidth + 'px';
      canvasElement.style.height = gameWindowHeight + 'px';
      videoElement.style.width = gameWindowWidth + 'px';
      videoElement.style.height = gameWindowHeight + 'px';

      canvasContext.save();
      canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

      gameDrawer.draw(game);
    });

    const unsubscribeStatusChangeEvent = gameManager.subscribe(
      'status-change',
      (game) => {
        if (game.getStatus() === BoostingGameStatus.Finished) {
          setFinished(true);
          setFinishedScore(game.getScore());

          canvasContext.save();
          canvasContext.clearRect(
            0,
            0,
            canvasElement.width,
            canvasElement.height,
          );

          unsubscribeStatusChangeEvent();
          unsubscribeTickEvent();
        }

        if (game.getStatus() === BoostingGameStatus.Setup) {
          setInitialized(true);
        }
      },
    );

    gameManager.initialize().then(() => setGameManager(gameManager));

    return () => {
      unsubscribeTickEvent();
      unsubscribeStatusChangeEvent();

      gameManager.stopGame();
    };
  }, []);

  return (
    <>
      <StyledGameLayout>
        {!initialized && (<StyledInitializationOverlay>
          <InitializationInProgressTypography variant="h1">
            Initializing...
          </InitializationInProgressTypography>
        </StyledInitializationOverlay>)}
        <StyledWebcam ref={webcamRef} audio={false} />
        <StyledCanvas ref={canvasRef}></StyledCanvas>
      </StyledGameLayout>
      {finished && (
        <Modal onClose={onClose}>
          <MintNft score={finishedScore} />
        </Modal>
      )}
    </>
  );
};
export default BoostingGame;
