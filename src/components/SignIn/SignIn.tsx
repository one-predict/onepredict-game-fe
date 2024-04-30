import styled from 'styled-components';
import { useSignIn, QRCode} from "@farcaster/auth-kit";
import useAsyncEffect from "../../hooks/useAsyncEffect.ts";
import Typography from "../Typography";
import { useWindowSize } from "../../hooks/useWindowSize.ts";

const SignInLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
`;

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

  const {
    signIn,
    connect,
    channelToken,
    url,
  } = useSignIn({

  });

  useAsyncEffect(async () => {
    if (!channelToken) {
      await connect();
      await signIn();
    }
  }, [channelToken, connect, signIn]);

  return (
    <SignInLayout>
      <SignInCard>
        <StyledTitle variant="h1">Hello Picker!</StyledTitle>
        <Typography variant="h3">Sign in with Farcaster to continue.</Typography>
        <StyledQRCodeContainer>
          {url && <QRCode
            size={width <= SMALL_QR_CODE_WINDOW_WIDTH ? SMALL_QR_CODE_SIZE : LARGE_QR_CODE_SIZE}
            logoSize={0}
            logoMargin={0}
            uri={url}
          />}
        </StyledQRCodeContainer>
        <a href={url}><Typography variant="body1">If using phone use this link</Typography></a>
      </SignInCard>
    </SignInLayout>
  );
};

export default SignIn;
