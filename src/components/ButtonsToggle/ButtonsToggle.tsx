import styled from 'styled-components';
import Typography from '@components/Typography';

interface ToggleItem {
  id: string;
  title: string;
}

export interface ButtonsToggleProps {
  className?: string;
  toggles: ToggleItem[];
  selectedId: string;
  onSwitch: (id: string) => void;
}

const StyledButtonToggleContainer = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: row;
  column-gap: 2px;
  border-radius: 12px;
  padding: 4px;
  background-color: #190A31;
`;

const StyledToggleButton = styled.div<{ $selected?: boolean; }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 11px;
  border-radius: 12px;
  cursor: pointer;
  border: ${({ $selected }) => $selected ? '1px solid #8C8498' : 'none'};
  background: ${({ $selected }) => $selected ? 'linear-gradient(111.04deg, rgba(44, 216, 213, 0.4) 0%, rgba(107, 141, 214, 0.4) 47.26%, rgba(142, 55, 215, 0.4) 98.45%)' : 'none'};
  box-shadow: ${({ $selected }) => $selected ? '0px 4px 10px 0px #8B46AB99' : 'none'};
`;

const ButtonsToggle = ({ toggles, onSwitch, selectedId, className }: ButtonsToggleProps) => {
  return (
    <StyledButtonToggleContainer className={className}>
      {toggles.map((item) => (
        <StyledToggleButton
          $selected={item.id === selectedId}
          onClick={() => onSwitch(item.id)}
          key={item.id}
        >
          <Typography variant="subtitle1">{item.title}</Typography>
        </StyledToggleButton>
      ))}
    </StyledButtonToggleContainer>
  );
};

export default ButtonsToggle;
