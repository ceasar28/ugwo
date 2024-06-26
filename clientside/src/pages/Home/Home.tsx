import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/amico.png";
import Button from "../../Components/Button";
// import { Avatar } from "@coinbase/onchainkit/identity";
// import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { useAccount, useDisconnect, useConnect, useChainId } from "wagmi";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { CoinbaseWalletLogo } from "../../utils/coinBaseWalletLogo";

const sdk = new CoinbaseWalletSDK({
  appName: "ụgwọ",
  appLogoUrl: "https://example.com/logo.png",
  appChainIds: [84532],
});

const provider = sdk.makeWeb3Provider();

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [profile] = useState<string[]>([]);
  const [message] = useState<string | boolean>(false);
  const account = useAccount();
  const { address } = useAccount();
  const { connectors, connect, status, data } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    createWallet();
    // handleDisconnectWallet();

    if (profile.length > 0) {
      navigate("/wallet");
    } else {
      console.log("no record");
      navigate("/profile");
    }
  };

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
  }, [disconnect]);

  return (
    <div className="w-full min-h-full flex justify-center bg-primary-100">
      <div className="w-[90vw] ms:w-[60vw] min-h-[80vh] ms:absolute flex flex-col justify-center items-center m-auto">
        <div className="w-[354px] text-center text-black text-[16px] sm:text-[20px] font-semibold font-Sora">
          Make Seamless Payment
        </div>
        <div className="w-[58px] h-[39px] text-center text-black text-[25px] font-semibold font-['Inter']"></div>

        <form
          className="bg-primary-100 rounded-lg shadow-8xl p-6 max-w-md mx-auto transform transition-all duration-300 hover:shadow-4xl"
          onSubmit={handleSubmit}
        >
          <img
            src={loginImage}
            alt="Logo"
            className="flex justify-center items-center w-[70%] ml-12"
          />
          <Button
<<<<<<< HEAD
            className="w-full h-12 mt-4 bg-black-600 text-white rounded-md hover:bg-black-400"
            onClick={handleSubmit} // Pass handleSubmit directly
=======
            className='w-full h-12 mt-4 bg-black-600 text-white rounded-md hover:bg-black-400'
            onClick={handleSubmit}
>>>>>>> ui
          >
            Get Started
          </Button>

          {message && (
            <p className="mt-[0.5rem] text-center text-[19px] font-semibold">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
