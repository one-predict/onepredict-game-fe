import Webcam from 'react-webcam';
import { useEffect, useRef, useState } from 'react';
import TapVideoGameStatus from '@app/enums/TapVideoGameStatus';
import TapVideoGameManager from '@tap-video-game/TapVideoGameManager';
import CanvasGameDrawer from '@tap-video-game/drawing/canvas/CanvasGameDrawer';
import Typography from '@components/Typography';
import styles from './TapVideoGame.module.scss';

const TapVideoGame = () => {
  const webcamRef = useRef<Webcam>(null!);
  const canvasRef = useRef(null);

  const [initialized, setInitialized] = useState(false);

  const [, setFinished] = useState(false);
  const [, setFinishedScore] = useState(0);

  const [, setGameManager] = useState<TapVideoGameManager | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current as unknown as HTMLCanvasElement;
    const videoElement = webcamRef.current.video!;

    const canvasContext = canvasElement.getContext('2d');

    if (!canvasContext) {
      throw new Error('Cannot find canvas 2D context.');
    }

    const gameManager = new TapVideoGameManager(videoElement);
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

    const unsubscribeStatusChangeEvent = gameManager.subscribe('status-change', (game) => {
      if (game.getStatus() === TapVideoGameStatus.Finished) {
        setFinished(true);
        setFinishedScore(game.getScore());

        canvasContext.save();
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

        unsubscribeStatusChangeEvent();
        unsubscribeTickEvent();
      }

      if (game.getStatus() === TapVideoGameStatus.Setup) {
        setInitialized(true);
      }
    });

    gameManager.initialize().then(() => setGameManager(gameManager));

    return () => {
      unsubscribeTickEvent();
      unsubscribeStatusChangeEvent();

      gameManager.stopGame();
    };
  }, []);

  return (
    <>
      <div className={styles.gameLayout}>
        {!initialized && (
          <div className={styles.initializationOverlay}>
            <Typography className={styles.initializationText} variant="h1">
              Initializing...
            </Typography>
          </div>
        )}
        <Webcam className={styles.webcam} ref={webcamRef} audio={false} />
        <canvas className={styles.gameCanvas} ref={canvasRef}></canvas>
      </div>
    </>
  );
};
export default TapVideoGame;
