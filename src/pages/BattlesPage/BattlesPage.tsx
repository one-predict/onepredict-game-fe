import styled from 'styled-components';
import { PageLayoutWithMenu } from '@components/Layouts';
import UserBadge from '@components/UserBadge';
import Typography from '@components/Typography';

const StyledComingSoonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const BattlesPage = () => {
  return (
    <PageLayoutWithMenu pageTitle="Battles" backHref="/">
      <UserBadge />
      <StyledComingSoonSection>
        <Typography variant="h1">Coming soon!</Typography>
      </StyledComingSoonSection>
    </PageLayoutWithMenu>
  );
};

export default BattlesPage;
