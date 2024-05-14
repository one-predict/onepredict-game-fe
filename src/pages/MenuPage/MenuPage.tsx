import { useNavigate } from 'react-router-dom';
import PageLayout from '@components/PageLayout';
import Menu from '@components/Menu';

const MenuPage = () => {
  const navigate = useNavigate();
  
  const handleCreatePortfolioButtonClick = () => {
    navigate('/offers');
  };

  const handleBoostPointsButtonClick = () => {
    navigate('/boosting');
  };
  
  return (
    <PageLayout>
      <Menu
        onCreatePortfolioButtonClick={handleCreatePortfolioButtonClick}
        onBoostPointsButtonClick={handleBoostPointsButtonClick}
      />
    </PageLayout>
  );
};

export default MenuPage;
