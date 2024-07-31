import WebApp from '@twa-dev/sdk';
import { useNavigate } from "react-router-dom";
import useSignInMutation from "@hooks/mutations/useSignInMutation";
import LoadingPage from "@pages/LoadingPage";
import useAsyncEffect from "@hooks/useAsyncEffect";

const SignInPage = () => {
  const { mutateAsync: signIn } = useSignInMutation();
  const navigate = useNavigate();

  useAsyncEffect(async () => {
    await signIn(WebApp.initData);

    navigate('/');
  }, []);

  return (
    <LoadingPage />
  );
};

export default SignInPage;
