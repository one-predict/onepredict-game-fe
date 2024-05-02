import styled from "styled-components";
import {ReactNode, useState} from "react";
import Button from "../../components/Button";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
    width: 100%;
  background-color: #151727;
    overflow: hidden;
`;

const FadeCircle = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: #FF7272;
    opacity: .25;
    filter: blur(1.2rem);
`

const StyledGameMenuButton = styled(Button)`
  margin-top: 24px;
  width: 100%;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: unset;
  }
`;
const FirstLayer = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid  #9A5DEE;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
    margin-top: 24px;
    margin-left: 24px;
    margin-right: 24px;
    font-size: 14px;
`;
const SecondLayer = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid  #9A5DEE;
  transform: translate(5px, -5px);
`;
const ThirdLayer = styled.div`
    width: 300px;
  height: 400px;
  border: 1px solid  #9A5DEE;
  transform: translate(5px, -5px);
`;

const StepContainer = styled.div`
    width: 80%;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 800px) {
        width: 100%;
        flex-direction: column;
        margin-left: 0;
        margin-right: 0;
    }
`;

const StepButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const StepButton = styled.button`
    width: 200px;
    height: 100px;
    border: none;
    color: white;
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(to right, #FF56F6 1px, transparent 1px) 0 100%,
            linear-gradient(to left, #FF56F6 1px, transparent 1px) 100% 0,
            linear-gradient(to bottom, #FF56F6 1px, transparent 1px) 100% 0,
            linear-gradient(to top, #FF56F6 1px, transparent 1px) 0 100%;
    background-repeat: no-repeat;
    background-size: 20px 20px;

    @media (max-width: 800px) {
        width: 150px;
        height: 100px;
    }
`;

const MiddleContainer = styled.div`
    position: absolute;
    @media (max-width: 800px) {
        position: relative;
        transform: translateY(-25%) !important;
    }
`

const MiddleContainerTitle = styled.div`
    font-family: "Orbitron", sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const StepButtonTitle = styled.span`
    font-family: "Orbitron", sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: 32px;
    color: white;
`;

const StepButtonSubtitle = styled.span`
    color: #801F75;
    font-family: "Orbitron", sans-serif;
    font-weight: normal;
    font-style: normal;
`

const CoinsHeaderContainer = styled.div`
    width: 300px;
    display:flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`

type ChooseProps = {
    onBack: () => void;
}

type Coins = {
    name: string;
    value: number;
}

const Choose = ({ onBack } : ChooseProps) => {
    const [step, setStep] = useState<number>(0);
    const [ coins, setCoins ] = useState<Coins[]>([])

    const steps: { [key: number]: ReactNode } = {
        0: <StepContainer>
            <MiddleContainer>
                <CoinsContainer>
                    <MiddleContainerTitle>
                        FIRST COIN
                    </MiddleContainerTitle>
                </CoinsContainer>
            </MiddleContainer>
            <StepButtonContainer>
                <StepButton onClick={() => {
                    setCoins([...coins, {
                        name: "BTC",
                        value: 10
                    }])
                    setStep(1)
                }}>
                    <StepButtonTitle>BTC</StepButtonTitle>
                    <StepButtonSubtitle>Select token</StepButtonSubtitle>
                </StepButton>
                <StepButton onClick={() => {
                    setCoins([...coins, {
                        name: "ETH",
                        value: 20
                    }])
                    setStep(1)
                }}>
                    <StepButtonTitle>ETH</StepButtonTitle>
                    <StepButtonSubtitle>Select token</StepButtonSubtitle>
                </StepButton>
            </StepButtonContainer>
        </StepContainer>,
        1: <StepContainer>
        <MiddleContainer>
            <CoinsContainer>
                <MiddleContainerTitle>
                    SECOND COIN
                </MiddleContainerTitle>
            </CoinsContainer>
        </MiddleContainer>
        <StepButtonContainer>
            <StepButton onClick={() => {
                setCoins([...coins, {
                    name: "ATOM",
                    value: 30
                }])
                setStep(2)
            }}>
                <StepButtonTitle>ATOM</StepButtonTitle>
                <StepButtonSubtitle>Select token</StepButtonSubtitle>
            </StepButton>
            <StepButton onClick={() => {
                setCoins([...coins, {
                    name: "ARB",
                    value: 40
                }])
                setStep(2)
            }}>
                <StepButtonTitle>ARB</StepButtonTitle>
                <StepButtonSubtitle>Select token</StepButtonSubtitle>
            </StepButton>
        </StepButtonContainer>
        </StepContainer>,
        2: <StepContainer>
            <MiddleContainer>
                <CoinsContainer>
                    <MiddleContainerTitle>
                        First coin: {coins[0]?.name},
                        second coin: {coins[1]?.name}
                    </MiddleContainerTitle>
                </CoinsContainer>
            </MiddleContainer>
       <StepButtonContainer>
           <StepButton onClick={() => {
               setCoins([])
               setStep(0)
           }}>
               BACK
           </StepButton>

           <StepButton onClick={() => {
               setCoins([])
               setStep(0)
               void onBack();
           }}>
               SUBMIT
           </StepButton>
       </StepButtonContainer>
        </StepContainer>
    }
        return (
        <PageContainer>
            <div style={{ width: "100%" }}>
                {steps[step]}
            </div>
        </PageContainer>
    )
}

const PageContainer = ({ children }: {children: ReactNode}) => {
    return (
        <LayoutContainer>
            <div style={{
                position: "absolute",
                top: -50,
                left: -50,
            }}>
                <FadeCircle/>
            </div>
            <div style={{
                position: "absolute",
                bottom: -10,
                left: 100,
            }}>
                <FadeCircle/>
            </div>
            <div style={{
                position: "absolute",
                top: 100,
                right: 100,
            }}>
                <FadeCircle/>
            </div>
            <div style={{
                position: "absolute",
                top: 110,
                right: 110,
            }}>
                <FadeCircle/>
            </div>
            <div style={{
                position: "absolute",
                top: 200,
                right: 50,
            }}>
                <FadeCircle/>
            </div>
            <div style={{
                zIndex: 100,
                width: "100%",
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                {children}
            </div>
        </LayoutContainer>
    )
}

const CoinsContainer = ({ children }: {children: ReactNode}) => {
    return (
        <FirstLayer>
            <SecondLayer>
                <ThirdLayer>
                    {children}
                </ThirdLayer>
            </SecondLayer>
        </FirstLayer>
    )
}


type PortfolioProps = {
    onBack: () => void;
}

const Portfolio = ({ onBack }: PortfolioProps) => {
    return (
        <PageContainer>
            <CoinsHeaderContainer>
                <StepButtonTitle>Live</StepButtonTitle>
                <StepButtonSubtitle>Apr 27th 12AM - 11:59PM (PT)</StepButtonSubtitle>
            </CoinsHeaderContainer>

            <CoinsContainer>
                <div style={{
                    display: 'flex',
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <h1>Some text inside</h1>
                </div>
            </CoinsContainer>
            <StyledGameMenuButton onClick={onBack}>Back</StyledGameMenuButton>
        </PageContainer>
    )
}

const PortfolioRouter = () => {
    const [ page, setPage ] = useState<number>(0);

    const pages: { [key: number]: ReactNode } = {
        0: <PageContainer>
            <>
                <h1 style={{
                    color: "white"
                }}>Portfolio</h1>
                <StyledGameMenuButton onClick={() => setPage(1)}>Portfolio</StyledGameMenuButton>
                <StyledGameMenuButton onClick={() => setPage(2)}>Choose</StyledGameMenuButton>
            </>
        </PageContainer>,
        1: <Portfolio onBack={() => setPage(0)} />,
        2: <Choose onBack={() => setPage(0)} />
    }
    if(page > 2) {
        return null
    }

    return (
        <>
            {pages[page]}
        </>
    )
}

export default PortfolioRouter;