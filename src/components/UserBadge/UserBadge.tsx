import styled from 'styled-components';
import Badge from '@components/Badge';
import useSession from '@hooks/useSession';

const StyledBadge = styled(Badge)`
  width: 100%;
  
  @media (${({ theme }) => theme.devices.desktop}) {
    width: 600px;
    min-width: 600px;
  }
`;

const UserBadge = () => {
  const currentUser = useSession();

  return (
    <StyledBadge
      items={[{
        title: 'Username',
        value: `@${currentUser?.username || '-'}`,
        imageSrc: currentUser?.imageUrl,
      }, {
        title: 'Balance',
        value: `${currentUser?.coinsBalance} AIP`,
        valueAlignment: 'right',
      }, {
        value: '1',
        title: 'Level',
        valueAlignment: 'right',
      }]}
    />
  );
};

export default UserBadge;
