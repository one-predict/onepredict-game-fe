import Webcam from 'react-webcam';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GameManager from '../../GameManager';
import { Game } from '../../game/Game';
import CanvasGameDrawer from '../../drawing/canvas/CanvasGameDrawer';
import { DrawingUtils } from '@mediapipe/tasks-vision';
import MintNftModal from '../MintNftModal';

function mirrorLandmarks(landmarks: any) {
  return landmarks.map((landmark: any) => {
    return { ...landmark, x: 1 - landmark.x }; // Предполагая, что координаты x нормализованы [0, 1]
  });
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
  background-color: black;
`;

const GameComponent = () => {
  const webcamRef = useRef<Webcam>(null!);
  const canvasRef = useRef(null);
  const [finished, setFinished] = useState(false);
  const [finishedScore, setFinishedScore] = useState(0);

  const [error] = useState('');

  const [, setGameManager] = useState<GameManager | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current as unknown as HTMLCanvasElement;
    const videoElement = webcamRef.current.video!;

    const canvasContext = canvasElement.getContext('2d');

    if (!canvasContext) {
      throw new Error('Cannot find canvas 2D context.');
    }

    const gameManager = new GameManager(videoElement);

    const gameDrawer = new CanvasGameDrawer(canvasContext);

    const drawingUtils = new DrawingUtils(canvasContext);

    const unsubscribe = gameManager.subscribeToGameEvent((game: Game) => {
      const [gameWindowWidth, gameWindowHeight] = game.getDimensions();

      canvasElement.width = gameWindowWidth;
      canvasElement.height = gameWindowHeight;

      canvasElement.style.width = gameWindowWidth + 'px';
      canvasElement.style.height = gameWindowHeight + 'px';
      videoElement.style.width = gameWindowWidth + 'px';
      videoElement.style.height = gameWindowHeight + 'px';

      canvasContext.save();
      //canvasContext.scale(-1, 1);
      canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

      const [postLandmarks] = game.getLastPose();

      console.log(postLandmarks);

      const filteredPoseLandmarks = postLandmarks
        ? postLandmarks.filter((_, index) => {
            return (
              index === 15 ||
              index === 17 ||
              index === 19 ||
              index === 21 ||
              index === 20 ||
              index === 18 ||
              index === 18 ||
              index === 16 ||
              index === 14
            );
          })
        : [];

      const mirrowedLandmarks = mirrorLandmarks(filteredPoseLandmarks);

      drawingUtils.drawLandmarks(mirrowedLandmarks);

      gameDrawer.draw(game);

      //canvasContext.scale(-1, 1);
    });

    gameManager.subscibeToGameStopEvent((game: Game) => {
      setFinished(true);
      setFinishedScore(game.getScore());

      canvasContext.save();
      canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    });

    gameManager.startGame().then(() => setGameManager(gameManager));

    return unsubscribe;
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <StyledGameLayout>
        <Webcam style={{ transform: 'scaleX(-1)' }} ref={webcamRef} audio={false} />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 1280,
            height: 720,
          }}
        ></canvas>
      </StyledGameLayout>
      {finished && <MintNftModal score={finishedScore} />}
    </div>
  );
};
export default GameComponent;
