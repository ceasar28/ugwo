import React, { useState, useEffect } from "react";
import Button from "./Button";
import { ethers, parseEther, parseUnits } from "ethers";
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
} from "wagmi";
import abi from "../utils/contractABI.json";

const contractAddress = "0xDA640C8b7495577DAC1bee511092320812cDEc5E";

interface SendModalProps {
  handleModalClose: () => void;
}

const mockWalletDatabase: { [key: string]: string } = {
  wallet1: "0x1234567890abcdef1234567890abcdef12345678",
  wallet2: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
};
const isValidEthereumAddress = (address: any) => {
  return ethers.isAddress(address);
};

const checkWalletExistence = (walletNameOrAddress: string) => {
  if (mockWalletDatabase[walletNameOrAddress]) {
    return mockWalletDatabase[walletNameOrAddress];
  }
  return "not existing";
};

const SendModal: React.FC<SendModalProps> = ({ handleModalClose }) => {
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [walletInfo, setWalletInfo] = useState<string>("");

  useEffect(() => {
    if (address) {
      if (isValidEthereumAddress(address)) {
        setWalletInfo(address);
      } else {
        //TODO: call the backend to check if wallet exist
      }
    } else {
      setWalletInfo("");
    }
  }, [address]);

  // Configure the write function call
  const { data: simulateContractData, error: writeContractError } =
    useSimulateContract({
      address: contractAddress,
      abi: abi,
      functionName: "sendPayment",
      args: [address, `Sent ${amount} to ${address}`],
      // send ETH according to the price of the NFT:
      value: parseEther(`${amount}` || "0"),
    });

  // Get the write function
  const {
    error: writeError,
    writeContractAsync,
    data: writeContractData,
  } = useWriteContract();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleSubmit = () => {
    if (walletInfo !== "not existing") {
      if (simulateContractData?.request) {
        writeContractAsync(simulateContractData!.request);
      } else {
        alert(writeError);
      }
      handleModalClose();
    } else {
      alert("Wallet does not exist");
    }
  };

  const isSendDisabled = !address || walletInfo === "not existing";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md">
        <h2 className="text-h5 mb-4">Send ETH</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Wallet Name or Address
          </label>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter wallet name or address"
          />
          {address && <p className="text-red-500 mt-2">{walletInfo}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount in ETH"
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            className={`bg-blue-500 text-white py-2 px-4 rounded ${
              isSendDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isSendDisabled}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendModal;
