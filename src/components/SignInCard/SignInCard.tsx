import { useCallback } from 'react';
import styled from 'styled-components';
import { useSignIn, QRCode, UseSignInData } from '@farcaster/auth-kit';
import useAsyncEffect from '@hooks/useAsyncEffect';
import useWindowSize from '@hooks/useWindowSize';
import useSignInMutation from '@hooks/mutations/useSignInMutation';
import Typography from '@components/Typography';

const StyledSignInCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 343px;
  padding: 20px 0;
  border-radius: 24px;
  box-shadow: 0 0 8px -1px rgba(33, 30, 33, 1);
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 10;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 500px;
  }
`;

const SignInCardTypography = styled(Typography)`
  color: #439CB5;
`;

const StyledTitle = styled(SignInCardTypography)`
  margin-bottom: 16px;
  color: #439CB5;
`;

const StyledQRCodeContainer = styled.div`
  margin: 16px 0;
`;

const SMALL_QR_CODE_WINDOW_WIDTH = 480;
const SMALL_QR_CODE_SIZE = 250;
const LARGE_QR_CODE_SIZE = 300;

const SignInCard = () => {
  const { width } = useWindowSize();

  const { mutate: signIn } = useSignInMutation();

  const handleSuccessFarcasterSignIn = useCallback(
    async (response: UseSignInData) => {
      await signIn({
        message: response.message || '',
        signature: response.signature as string,
        pfp: response.pfpUrl || '',
        username: response.username || '',
        nonce: response.nonce,
      });
    },
    [signIn],
  );

  const {
    signIn: signInToFarcaster,
    connect,
    channelToken,
    url,
  } = useSignIn({
    onSuccess: handleSuccessFarcasterSignIn,
  });

  useAsyncEffect(async () => {
    if (!channelToken) {
      await connect();
      await signInToFarcaster();
    }
  }, [channelToken, connect, signInToFarcaster]);

  return (
    <StyledSignInCardContainer>
      <StyledTitle variant="h1">Hello Picker!</StyledTitle>
      <SignInCardTypography variant="h4">Sign in with Farcaster to continue.</SignInCardTypography>
      <StyledQRCodeContainer>
        {url && (
          <QRCode
            size={width <= SMALL_QR_CODE_WINDOW_WIDTH ? SMALL_QR_CODE_SIZE : LARGE_QR_CODE_SIZE}
            logoSize={0}
            logoMargin={0}
            uri={url}
          />
        )}
      </StyledQRCodeContainer>
      <a href={url}>
        <SignInCardTypography variant="body1">If using phone use this link</SignInCardTypography>
      </a>
    </StyledSignInCardContainer>
  );
};

export default SignInCard;
