import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Components/Button";
import SendModal from "./SendModal";
import RequestModal from "./RequestModal";
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

const contractAddress = "0x604b1a9592faf8380b9608cf327652d5bf1012ab";

interface BalanceSectionProps {
  balanceUSD: number;
  ethValue: string;
  conversionRates: { [key: string]: number };
}

const BalanceSection: React.FC<BalanceSectionProps> = ({
  balanceUSD,
  ethValue,
  conversionRates,
}) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);

  const [showCurrencyOptions, setShowCurrencyOptions] =
    useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const walletName = "Dera_007"; // Example wallet name
  const walletAddress = "0x1234567890abcdef"; // Example wallet address

  // Configure the write function call
  const { data: simulateContractData, error: writeContractError } =
    useSimulateContract({
      address: contractAddress,
      abi: abi,
      functionName: "sendPayment",
      args: ["0x6040f022A448dd278D3D5fA0c7998A45eaf8BFBf", "Team"],
      // send ETH according to the price of the NFT:
      value: parseEther("0.5"),
    });

  // Get the write function
  const {
    error: writeError,
    writeContractAsync,
    data: writeContractData,
  } = useWriteContract();

  const getConvertedBalance = (): string => {
    return (balanceUSD * conversionRates[selectedCurrency]).toFixed(2);
  };

  const toggleBalanceVisibility = (): void => {
    setShowBalance(!showBalance);
  };

  const toggleCurrencyOptions = (): void => {
    setShowCurrencyOptions(!showCurrencyOptions);
  };

  const handleCurrencyChange = (currency: string): void => {
    setSelectedCurrency(currency);
    setShowCurrencyOptions(false);
  };

  const handleModalOpen = (modalName: string): void => {
    if (simulateContractData?.request) {
      console.log(writeContractAsync(simulateContractData!.request));
    }
    setActiveModal(modalName);
  };

  const handleModalClose = (): void => {
    setActiveModal(null);
  };

  const handleSend = (address: string, amount: number, currency: string) => {
    // Implement the send functionality here
    console.log(`Sending ${amount} ${currency} to ${address}`);
  };

  return (
    <div className="bg-primary-100 font-Inter">
      <main className="bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md text-center">
        <section className="p-6 w-full max-w-md text-center">
          <div className="flex justify-between w-full">
            <div className=" justify-between gap-20 ss:gap-[180px] items-center m-auto">
              <div className="flex justify-center items-center m-auto">
                <h2 className="text-h5 mb-4">Balance</h2>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="ml-2 mb-3 cursor-pointer"
                    onClick={toggleCurrencyOptions}
                  />
                  {showCurrencyOptions && (
                    <div className="absolute bg-primary-100 w-[200px] border rounded shadow-lg mt-0 left-[-130px] z-10">
                      <div
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleCurrencyChange("USD")}
                      >
                        USD (USD)
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleCurrencyChange("NGN")}
                      >
                        Naira (NGN)
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleCurrencyChange("GBP")}
                      >
                        Pound (GBP)
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleCurrencyChange("EUR")}
                      >
                        Euro (EUR)
                      </div>
                    </div>
                  )}
                </div>
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
          <div className="relative flex justify-center items-center">
            <div className="text-2xl font-semibold font-['Inter'] text-primary-600">
              {showBalance
                ? `${selectedCurrency} ${getConvertedBalance()}`
                : "•••••"}
            </div>
          </div>
          <div className="text-h6 text-gray-400 mb-4">
            {showBalance ? `${ethValue} ETH` : ""}
          </div>
          <div className="flex justify-between w-full gap-5">
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
        <SendModal
          handleModalClose={handleModalClose}
          handleSend={handleSend}
          conversionRates={conversionRates}
        />
      )}

      {activeModal === "request" && (
        <RequestModal
          handleModalClose={handleModalClose}
          walletName={walletName}
          walletAddress={walletAddress}
          availableBalance={parseFloat(ethValue)} // Pass ethValue as availableBalance
          conversionRates={conversionRates}
        />
      )}
    </div>
  );
};

export default BalanceSection;
