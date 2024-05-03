import styled from 'styled-components';
import { useSignIn, QRCode, UseSignInData } from '@farcaster/auth-kit';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import Typography from '../Typography';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useCallback } from 'react';
import useSignInMutation from '../../hooks/mutations/useSignInMutation';
import Layout from '../Layout';

const SignInCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 370px;
  padding: 20px;
  border-radius: 24px;
  box-shadow: 0 0 8px -1px rgba(33, 30, 33, 1);
  background-color: ${({ theme }) => theme.palette.white100Base};

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 546px;
  }
`;

const StyledTitle = styled(Typography)`
  margin-bottom: 16px;
`;

const StyledQRCodeContainer = styled.div`
  margin: 16px 0;
`;

const SMALL_QR_CODE_WINDOW_WIDTH = 480;

const SMALL_QR_CODE_SIZE = 250;
const LARGE_QR_CODE_SIZE = 300;

const SignIn = () => {
  const { width } = useWindowSize();

  const { mutate: signIn } = useSignInMutation();

  const handleFarcasterSignInSuccess = useCallback(
    async (response: UseSignInData) => {
      await signIn({
        message: response.message || '',
        signature: response.signature as string,
        pfp: response.pfpUrl || '',
        name: response.displayName || '',
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
    onSuccess: handleFarcasterSignInSuccess,
  });

  useAsyncEffect(async () => {
    if (!channelToken) {
      await connect();
      await signInToFarcaster();
    }
  }, [channelToken, connect, signInToFarcaster]);

  return (
    <Layout>
      <SignInCard>
        <StyledTitle variant="h1">Hello Picker!</StyledTitle>
        <Typography variant="h3">Sign in with Farcaster to continue.</Typography>
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
          <Typography variant="body1">If using phone use this link</Typography>
        </a>
      </SignInCard>
    </Layout>
  );
};

export default SignIn;
