import Badge from '@components/Badge';
import useSession from '@hooks/useSession';

const UserBadge = () => {
  const currentUser = useSession();

  return (
    <Badge
      items={[
        {
          title: 'Username',
          value: `@${currentUser?.username || '-'}`,
          imageSrc: currentUser?.imageUrl,
        },
        {
          title: 'Balance',
          value: `${currentUser?.coinsBalance} AIP`,
          valueAlignment: 'right',
        },
        {
          value: '1',
          title: 'Level',
          valueAlignment: 'right',
        },
      ]}
    />
  );
};

export default UserBadge;
