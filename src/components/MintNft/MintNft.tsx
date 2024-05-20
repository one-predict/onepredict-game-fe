import { useCallback, useMemo, useRef, useState } from 'react';
import { ethers } from 'ethers';
import styled, { keyframes } from 'styled-components';
import { useSDK } from '@metamask/sdk-react';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import useAsyncEffect from '@hooks/useAsyncEffect';
import Button from '@components/Button';
import Typography from '@components/Typography';
import MintNftStatus from '@app/enums/MintNftStatus';

export interface MintNftModalProps {
  score: number;
}

const MintNftButton = styled(Button)`
  width: 100%;
  margin-top: 16px;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 350px;
  }
`;

const OpacityKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  
  30% {
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`;

const BodyTypography = styled(Typography)`
  margin-top: 10px;
  color: ${({ theme }) => theme.palette.darkPurple};
  text-align: center;
`;

const AnimatedBodyTypography = styled(BodyTypography)`
  animation: ${OpacityKeyframes} 2.5s infinite;
`;

const MINT_NFT_CHAIN_ID = import.meta.env.VITE_MINT_NFT_CHAIN_ID;
const CONTRACT_ABI = import.meta.env.VITE_CONTRACT_ABI;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const MintNft = ({ score }: MintNftModalProps) => {
  const [mintingSessionId, setMintingSessionId] = useState(useMemo(() => nanoid(), []));
  const [mintStatus, setMintStatus] = useState<MintNftStatus | null>(null);

  const mintingRef = useRef(false);

  const { sdk, connected, connecting, chainId } = useSDK();

  const mint = useCallback(async (contractScore: number) => {
    // @ts-expect-error
    const web3Provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await web3Provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const transactionResponse = await contract.mint(contractScore);
    await transactionResponse.wait();
  }, []);

  useAsyncEffect(async () => {
    if (!chainId || !connected) {
      return;
    }

    if (chainId !== MINT_NFT_CHAIN_ID) {
      return;
    }

    try {
      if (mintingRef.current) {
        return;
      }

      setMintStatus(MintNftStatus.InProgress);

      mintingRef.current = true;

      await mint(score);

      setMintStatus(MintNftStatus.Success);
    } catch (error: unknown) {
      setMintStatus(MintNftStatus.Failed);

      toast.error('NFT mint failed. Please try again.');
    } finally {
      mintingRef.current = false;
    }
  }, [chainId, connected, mintingSessionId, mint]);

  const handleRetryMintButtonClick = async () => {
    setMintingSessionId(nanoid());
  };

  const handleConnectWalletButtonClick = async () => {
    setMintStatus(null);

    try {
      await sdk?.connect();
    } catch (error: unknown) {
      toast.error('Metamask connection failed. Please try again.');
    }
  };

  return (
    <>
      <Typography variant="h3">Wow! You've earned {score} points!</Typography>
      {connected && (
        <>
          {chainId !== MINT_NFT_CHAIN_ID && (
            <AnimatedBodyTypography variant="h4">
              Waiting to Base Network to be selected...
            </AnimatedBodyTypography>
          )}
          {mintStatus === MintNftStatus.InProgress && (
            <AnimatedBodyTypography variant="h4">
              Minting your NFT...
            </AnimatedBodyTypography>
          )}
          {mintStatus === MintNftStatus.Success && (
            <BodyTypography variant="h4">
              Your token was minted successfully! Congratulations!
            </BodyTypography>
          )}
          {mintStatus === MintNftStatus.Failed && (
            <MintNftButton size="small" onClick={handleRetryMintButtonClick}>
              Retry Mint
            </MintNftButton>
          )}
        </>
      )}
      {!connected && (
        <>
          <BodyTypography variant="h4">You can take your nft. Please connect your wallet to proceed.</BodyTypography>
          <MintNftButton size="small" onClick={handleConnectWalletButtonClick} loading={connecting}>
            Connect you wallet.
          </MintNftButton>
        </>
      )}
    </>
  );
};

export default MintNft;

