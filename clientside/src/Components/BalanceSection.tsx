import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../Components/Button";
import SendModal from "./SendModal";
import RequestModal from "./RequestModal";
import axios from "axios";
import { Address, Avatar } from "@coinbase/onchainkit/identity";
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
} from "wagmi";
import { parseEther } from "ethers";
import abi from "../utils/contractABI.json";

const contractAddress = "0x468a05df850c836ca08ad965fd5188fa4b3ba032";

interface BalanceSectionProps {
  balanceUSD: number;
  ethValue: string;
  conversionRates: { [key: string]: number };
}

const BalanceSection: React.FC<BalanceSectionProps> = () => {
  const [userAddress, setUserAddress] = useState<any>(
    "0x6040f022A448dd278D3D5fA0c7998A45eaf8BFBf"
  );
  const [ethValue, setEthValue] = useState<string>("0");
  const [USDValue, setUSDValue] = useState<number>(0);
  const [usdRate, setUSDRate] = useState<number>(0);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>("0x..");
  const [walletName, setWalletName] = useState<string>("0x..");

  const account = useAccount();
  const { address } = useAccount();
  const { data, refetch } = useBalance({
    address: address,
  });

  const toggleBalanceVisibility = (): void => {
    setShowBalance(!showBalance);
  };

  const handleModalOpen = (modalName: string): void => {
    setActiveModal(modalName);
  };

  const handleModalClose = (): void => {
    setActiveModal(null);
  };

  // const handleSend = (address: string, amount: number) => {
  //   // Configure the write function call
  //   const { data: simulateContractData, error: writeContractError } =
  //     useSimulateContract({
  //       address: contractAddress,
  //       abi: abi,
  //       functionName: "sendPayment",
  //       args: [address, `Sent ${amount} to ${address}`],
  //       // send ETH according to the price of the NFT:
  //       value: parseEther(`${amount}`),
  //     });

  //   // Get the write function
  //   const {
  //     error: writeError,
  //     writeContractAsync,
  //     data: writeContractData,
  //   } = useWriteContract();

  //   if (simulateContractData?.request) {
  //     writeContractAsync(simulateContractData!.request);
  //   } else {
  //     alert(writeError);
  //   }
  //   console.log(`Sending ${amount} ETH to ${address}`);
  // };

  const getEthConversionRate = useCallback(async () => {
    try {
      const { data: ratesData } = await axios.get(
        `https://api.coinbase.com/v2/exchange-rates?currency=ETH`
      );
      if (ratesData?.data?.rates?.USD) {
        const usdRate = Number(ratesData.data.rates.USD);
        console.log(usdRate);
        setUSDRate(usdRate);
      } else {
        console.warn("No USD rate found");
      }
    } catch (error) {
      console.error("Error fetching ETH conversion rate:", error);
    }
  }, []);

  useEffect(() => {
    const Ethbalance = Number(data?.formatted) || 0;
    setEthValue(Ethbalance.toString());
    setUSDValue(Ethbalance * usdRate);

    const intervalId = setInterval(() => {
      getEthConversionRate();
    }, 30000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [data?.formatted, getEthConversionRate, usdRate]);

  useEffect(() => {
    if (address) {
      setUserAddress(address);
      setWalletAddress(address);
      setWalletName(address);
    }
  }, [address]);

  return (
    <div className="bg-primary-100 font-Inter">
      <main className="bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md text-center">
        <div className="flex justify-center items-center m-auto mb-[rem]">
          <Avatar address={userAddress} className="bg-primary-100" />
        </div>
        <section className="p-6 w-full max-w-md text-center">
          <div className="flex justify-between w-full">
            <div className="justify-between gap-20 ss:gap-[180px] items-center m-auto">
              <div className="flex justify-center items-center m-auto">
                <h2 className="text-h5 mb-2 text-black-600">Balance</h2>
              </div>
              <button
                onClick={toggleBalanceVisibility}
                className="text-black-400"
              >
                <FontAwesomeIcon
                  icon={showBalance ? faEyeSlash : faEye}
                  className="ml-2 mb-2"
                />
              </button>
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            {showBalance ? (
              <>
                <div className="text-2xl font-semibold font-['Inter'] text-primary-600">
                  {`$${USDValue.toFixed(2)}`}
                </div>

                <div className="text-h6 text-gray-400 mb-4">
                  {`${(+ethValue).toFixed(3)} ETH`}
                </div>
              </>
            ) : (
              <div className="text-2xl font-semibold font-['Inter'] text-primary-600">
                •••••
              </div>
            )}
          </div>
          <div className="flex justify-between w-full gap-5 mt-2">
            <Button
              className="w-[100px] ss:w-[180px] p-6 rounded-lg bg-primary-600 text-white py-2 px-4 hover:bg-primary-400"
              onClick={() => handleModalOpen("send")}
            >
              Send
            </Button>
            <Button
              className="w-[100px] ss:w-[180px] p-6 rounded-lg max-w-md bg-primary-600 text-white py-2 px-4 hover:bg-primary-400"
              onClick={() => handleModalOpen("request")}
            >
              Request
            </Button>
          </div>
        </section>
      </main>

      {activeModal === "send" && (
        <SendModal handleModalClose={handleModalClose} />
      )}

      {activeModal === "request" && (
        <RequestModal
          handleModalClose={handleModalClose}
          walletName={walletName}
          walletAddress={walletAddress}
          availableBalance={parseFloat(ethValue)} // Pass ethValue as availableBalance
        />
      )}
    </div>
  );
};

export default BalanceSection;
