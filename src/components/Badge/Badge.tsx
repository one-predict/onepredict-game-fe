import styled from 'styled-components';
import Typography from '@components/Typography';
import LabeledContent from '@components/LabeledContent';

export interface BadgeItem {
  title: string;
  value: string;
  valueAlignment?: 'left' | 'right';
  imageSrc?: string;
}

export interface BadgeProps {
  className?: string;
  items: BadgeItem[];
}

const StyledBadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: #190A31;
  border: 1px solid #8C8498;
  border-radius: 12px;
  padding: 10px 16px;
`;

const StyledBadgeItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledBadgeItemImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Badge = ({ className, items }: BadgeProps) => {
  return (
    <StyledBadgeContainer className={className}>
      {items.map((item, index) => {
        return (
          <StyledBadgeItem key={index}>
            {item.imageSrc && <StyledBadgeItemImage src={item.imageSrc} />}
            <LabeledContent title={item.title}>
              <Typography alignment={item.valueAlignment}>{item.value}</Typography>
            </LabeledContent>
          </StyledBadgeItem>
        );
      })}
    </StyledBadgeContainer>
  );
};

export default Badge;
