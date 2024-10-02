import Button from '@components/Button';
import Typography from '@components/Typography';
import OurTokenImage from '@components/OurTokenImage';
import { TOKEN_NAME } from '@constants/token';
import styles from './CoinsReward.module.scss';

export interface CoinsRewardProps {
  count: number;
  onClaimButtonClick: () => void;
}

const CoinsReward = ({ count, onClaimButtonClick }: CoinsRewardProps) => {
  return (
    <div className={styles.coinsRewardContainer}>
      <div className={styles.rewardInfoContainer}>
        <div className={styles.ourTokenImageContainer}>
          <OurTokenImage className={styles.ourTokenImage} />
          <div className={styles.ourTokenImageGlow} />
        </div>
        <Typography className={styles.congratulationsText} alignment="center" variant="h1" color="gradient1">
          Congratulations!
        </Typography>
        <Typography variant="h1">
          {count} {TOKEN_NAME}
        </Typography>
        <Typography alignment="center" variant="h5">
          added to your account
        </Typography>
        <Button onClick={onClaimButtonClick} size="large" className={styles.claimButton}>
          Claim
        </Button>
      </div>
    </div>
  );
};

export default CoinsReward;
