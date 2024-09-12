import clsx from 'clsx';
import styles from './UserAvatar.module.scss';

export interface UserAvatarProps {
  className?: string;
  imageUrl: string;
  username: string;
}

const UserAvatar = ({ className, imageUrl, username }: UserAvatarProps) => {
  return <img className={clsx(styles.userAvatar, className)} src={imageUrl || '/images/avatar.png'} alt={username} />;
};

export default UserAvatar;
