import React from 'react'
import { ThemeProvider } from "styled-components";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthKitProvider } from "@farcaster/auth-kit";
import theme from "./theme.ts";
import { JsonRpcProvider } from "ethers";
import { MetaMaskProvider } from "@metamask/sdk-react";

const config = {
  // For a production app, replace this with an Optimism Mainnet
  // RPC URL from a provider like Alchemy or Infura.
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: "example.com",
  siweUri: "https://example.com/login",
  provider: new JsonRpcProvider(undefined, 10)
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthKitProvider config={config}>
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            dappMetadata: {
              name: "Example React Dapp",
              url: window.location.href,
            },
            // Other options.
          }}
        >
          <App />
        </MetaMaskProvider>
      </AuthKitProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
