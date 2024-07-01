import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../layout/Navbar"; // Adjust the import path as needed
import loginImage from "../../assets/amico.png";
import Button from "../../Components/Button";
import { useAccount, useDisconnect, useConnect, useChainId } from "wagmi";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { CoinbaseWalletLogo } from "../../utils/coinBaseWalletLogo";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import {
  Address,
  Avatar,
  Badge,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";

const sdk = new CoinbaseWalletSDK({
  appName: "ụgwọ",
  appLogoUrl: "https://example.com/logo.png",
  appChainIds: [84532],
});

const provider = sdk.makeWeb3Provider();

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<string[]>([]);
  const [message, setMessage] = useState<string | boolean>(false);
  const account = useAccount();
  const { address, chain } = useAccount();
  const { connectors, connect, status, data } = useConnect();
  const { disconnect } = useDisconnect(); // Ensure disconnect is correctly imported and used
  const chainId = useChainId();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    // connect wallet
    await createWallet();
  };

  const createWallet = useCallback(async () => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      return await connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  const checkUserProfile = useCallback(
    async (walletAddress: any) => {
      try {
        const response = await axios.get(
          `https://ugwo.onrender.com/user/get-user/${walletAddress}`
        );
        if (response.data.user) {
          console.log(response.data);
          setProfile(response.data);
          navigate("/wallet");
          return;
        } else {
          navigate("/profile");
          return;
        }
      } catch (error) {
        console.log("No record found, navigating to profile creation.");
        navigate("/profile");
      }
    },
    [address]
  );

  useEffect(() => {
    if (address) {
      navigate("/wallet");
      return;
    } else {
      return;
    }

    // checkUserProfile(address);
  }, [address]);

  return (
    <div className="w-full min-h-full flex justify-center bg-primary-100">
      {/* <Navbar disconnect={handleDisconnectWallet} />
      <Button onClick={handleDisconnectWallet}>Disconnect</Button> */}
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
            className="w-full h-12 mt-4 bg-black-600 text-white rounded-md hover:bg-black-400"
            onClick={handleSubmit}
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
