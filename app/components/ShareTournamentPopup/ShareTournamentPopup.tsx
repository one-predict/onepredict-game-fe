import { Tournament } from '@api/TournamentApi';
import ShareTournament from '@components/ShareTournament';
import Popup, { PopupProps } from '@components/Popup';

export interface ShareTournamentPopupProps extends Omit<PopupProps, 'height' | 'title' | 'children'> {
  tournament: Tournament | null;
}

const SHARE_TOURNAMENT_POPUP_HEIGHT = 70;

const ShareTournamentPopup = ({ isOpen, tournament, ...restProps }: ShareTournamentPopupProps) => {
  return (
    <Popup
      {...restProps}
      isOpen={isOpen && !!tournament}
      height={SHARE_TOURNAMENT_POPUP_HEIGHT}
      title="Share Tournament"
    >
      {tournament && <ShareTournament tournament={tournament} />}
    </Popup>
  );
};

export default ShareTournamentPopup;
