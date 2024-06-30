import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../Components/Button";
import SendModal from "./SendModal";
import RequestModal from "./RequestModal";

interface BalanceSectionProps {
  balanceUSD: number;
  ethValue: string;
  conversionRates: { [key: string]: number };
}

const BalanceSection: React.FC<BalanceSectionProps> = ({
  balanceUSD,
  ethValue,
}) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const walletName = "Dera_007"; // Example wallet name
  const walletAddress = "0x1234567890abcdef"; // Example wallet address

  const toggleBalanceVisibility = (): void => {
    setShowBalance(!showBalance);
  };

  const handleModalOpen = (modalName: string): void => {
    setActiveModal(modalName);
  };

  const handleModalClose = (): void => {
    setActiveModal(null);
  };

  const handleSend = (address: string, amount: number, currency: string) => {
    // Implement the send functionality here
    return console.log(`Sending ${amount} ${currency} to ${address}`);
  };

  return (
    <div className="bg-primary-100 font-Inter">
      <main className="bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md text-center">
        <section className="p-6 w-full max-w-md text-center">
          <div className="flex justify-between w-full">
            <div className=" justify-between gap-20 ss:gap-[180px] items-center m-auto">
              <div className="flex justify-center items-center m-auto">
                <h2 className="text-h5 mb-4">Balance</h2>
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
              {showBalance ? `${ethValue} ETH` : "•••••"}
            </div>
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
        />
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
