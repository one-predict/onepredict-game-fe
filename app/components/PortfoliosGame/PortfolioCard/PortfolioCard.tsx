import { useMemo } from 'react';
import { Portfolio } from '@api/PortfolioApi';
import TokensCard from '@components/PortfoliosGame/TokensCard';

export interface PortfolioCardProps {
  className?: string;
  portfolio: Portfolio;
}

const PortfolioCard = ({ portfolio, className }: PortfolioCardProps) => {
  const availableTokens = useMemo(() => {
    return portfolio.selectedTokens.map((token) => token.id);
  }, [portfolio.selectedTokens]);

  return (
    <TokensCard className={className} availableTokens={availableTokens} selectedTokens={portfolio.selectedTokens} />
  );
};

export default PortfolioCard;
