import styled from 'styled-components';
import PageLayout from '@components/PageLayout';
import Loader from '@components/Loader';

const StyledLoader = styled(Loader)`
  height: 200px;
`;

const LoadingPage = () => {
  return (
    <PageLayout hideHeader>
      <StyledLoader />
    </PageLayout>
  );
};

export default LoadingPage;
