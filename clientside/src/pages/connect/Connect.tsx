import Logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';
// import { Avatar } from "@coinbase/onchainkit/identity";
// import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { useAccount, useDisconnect, useConnect, useChainId } from "wagmi";
import React, { useCallback, useEffect } from "react";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { CoinbaseWalletLogo } from "../../utils/coinBaseWalletLogo";

const sdk = new CoinbaseWalletSDK({
  appName: "ụgwọ",
  appLogoUrl: "https://example.com/logo.png",
  appChainIds: [84532],
});

const provider = sdk.makeWeb3Provider();

const Connect = () => {
  const account = useAccount();
  const { address } = useAccount();
  const { connectors, connect, status, data } = useConnect();
  const { disconnect, isDisconnected } = useDisconnect();
  const chainId = useChainId();
  const navigate = useNavigate();
  const [disconnected, setDisconnected] = useState(false);

  // if (address) {
  //   disconnect();
  //   const navigate = useNavigate();

  //   navigate("/dashboard");
  // }

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);


  const handleDisconnectWallet = useCallback(() => {
    disconnect();
    setDisconnected(true);
  }, [disconnect]);

  useEffect(() => {
    if (disconnected) {
      navigate('/');
    }
  }, [disconnected, navigate]);

  //   const createWallet = useCallback(async () => {
  //     try {
  //       const address = await provider.request({
  //         method: "eth_requestAccounts",
  //       });
  //       handleSuccess(address);
  //     } catch (error) {
  //       handleError(error);
  //     }
  //   }, [handleSuccess, handleError]);

  return (
    <div className="w-screen h-[40rem] flex flex-col justify-center items-center">
      <img src={Logo} alt="Logo" className="w-[30rem] mb-8" />
      <button
        className="bg-[--bg-color] px-4 w-[10rem] text-[--text-extra] py-2 flex justify-center items-center"
        onClick={createWallet}
      >
        <CoinbaseWalletLogo />
        {address ? address : "Connect Wallet"}
      </button>
      <button
        className="bg-[--bg-color] px-4 w-[10rem] text-[--text-extra] py-2 flex justify-center items-center"
        onClick={handleDisconnectWallet}
      >
        <CoinbaseWalletLogo />
        disconnect
      </button>
    </div>
  );
};

export default Connect;

// function handleSuccess(address: any) {
//   const navigate = useNavigate();

//   navigate("/dashboard");
//   alert(address);
//   throw new Error("Function not implemented.");
// }

// function handleError(error: unknown) {
//   alert(error);
//   throw new Error("Function not implemented.");
// }
