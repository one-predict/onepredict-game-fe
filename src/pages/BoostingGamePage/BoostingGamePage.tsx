import { useNavigate } from 'react-router-dom';
import BoostingGame from '@components/BoostingGame';
import PageLayout from '@components/PageLayout';

const BoostingGamePage = () => {
  const navigate = useNavigate();

  const handleGameClose = () => {
    navigate('/');
  };

  return (
    <PageLayout hideHeader>
      <BoostingGame onClose={handleGameClose} />
    </PageLayout>
  );
};

export default BoostingGamePage;
