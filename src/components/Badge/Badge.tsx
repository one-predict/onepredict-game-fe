import styled from 'styled-components';
import Typography from '@components/Typography';

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

const StyledBadgeItemInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const StyledBadgeItemImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const StyledBadgeItemTitle = styled(Typography)`
  color: #439CB5;
`;

const StyledBadgeItemValue = styled(Typography)<{ $valueAlignment?: 'left' | 'right'}>`
  text-align: ${({ $valueAlignment }) => $valueAlignment || 'left'};
`;

const Badge = ({ className, items }: BadgeProps) => {
  return (
    <StyledBadgeContainer className={className}>
      {items.map((item, index) => {
        return (
          <StyledBadgeItem key={index}>
            {item.imageSrc && <StyledBadgeItemImage src={item.imageSrc} />}
            <StyledBadgeItemInnerContainer>
              <StyledBadgeItemTitle variant="body2">{item.title}</StyledBadgeItemTitle>
              <StyledBadgeItemValue $valueAlignment={item.valueAlignment}>{item.value}</StyledBadgeItemValue>
            </StyledBadgeItemInnerContainer>
          </StyledBadgeItem>
        );
      })}
    </StyledBadgeContainer>
  );
};

export default Badge;
