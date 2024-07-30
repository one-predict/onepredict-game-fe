import { css } from 'styled-components';

const overflowedMixin = css`
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  &:hover {
    overflow: auto;
    text-overflow: unset;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
`;

export default overflowedMixin;
