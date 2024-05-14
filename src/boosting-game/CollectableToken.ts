import { tokensLogoSrcMap } from '@app/data/tokens';
import { Collectable } from './Collectable';
import TokenType from '../enums/TokenType';
import BaseCollectable from './Collectable';

export default class CollectableToken
  extends BaseCollectable<TokenType>
  implements Collectable<TokenType>
{
  public getImage() {
    return tokensLogoSrcMap[this.getType()];
  }
}
