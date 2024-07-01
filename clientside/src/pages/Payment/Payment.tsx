import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
  useConnect,
} from "wagmi";
import { parseEther } from "ethers";
import abi from "../../utils/contractABI.json";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import Button from "../../Components/Button";
import axios from "axios";

const contractAddress = "0x468a05df850c836ca08ad965fd5188fa4b3ba032";

const sdk = new CoinbaseWalletSDK({
  appName: "ụgwọ",
  appLogoUrl: "https://example.com/logo.png",
  appChainIds: [84532],
});

const provider = sdk.makeWeb3Provider();

const Payment: React.FC = () => {
  const { walletAddress, amountETH, note } = useParams<{
    walletAddress: string;
    amountUSD: string;
    note: string;
  }>();
  const [address, setAddress] = useState<string>(walletAddress || "");
  const [amount, setAmount] = useState<number>(parseFloat(amountETH) || 0);
  const [usdRate, setUsdRate] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [noteText, setNoteText] = useState<string>(note || "");
  const navigate = useNavigate();
  const { address: userAddress } = useAccount();
  const { connectors, connect } = useConnect();

  useEffect(() => {
    setAddress(walletAddress || "");
    setNoteText(note || "");
    setAmount(Number(amountETH));
  }, [walletAddress, amountETH, note]);

  const getEthConversionRate = useCallback(async () => {
    try {
      const { data: ratesData } = await axios.get(
        `https://api.coinbase.com/v2/exchange-rates?currency=ETH`
      );
      if (ratesData?.data?.rates?.USD) {
        const usdRate = Number(ratesData.data.rates.USD);
        setUsdRate(Number(ratesData.data.rates.USD));
        setConvertedAmount(Number(amountETH) / usdRate);
        return usdRate;
      } else {
        console.warn("No USD rate found");
      }
    } catch (error) {
      console.error("Error fetching ETH conversion rate:", error);
    }
  }, []);

  // Configure the write function call
  const { data: simulateContractData, error: writeContractError } =
    useSimulateContract({
      address: contractAddress,
      abi: abi,
      functionName: "sendPayment",
      args: ["0xaCfd8d7B61DDc02E9c8777475987A0717aEbA4Bd", `${note}`],
      value: parseEther(`${convertedAmount}`),
    });

  // Get the write function
  const {
    error: writeError,
    writeContractAsync,
    data: writeContractData,
  } = useWriteContract();

  const handleSend = () => {
    console.log(`Sending ${amount} ETH to ${address} with note: ${note}`);

    if (simulateContractData?.request) {
      writeContractAsync(simulateContractData!.request);
    } else {
      alert(writeContractError?.message);
    }
    // Implement the send functionality here
  };

  const handleModalClose = () => {
    navigate(-2); // Navigate back
  };

  const createWallet = useCallback(async () => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector) {
      return await connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  const handleSubmit = async () => {
    if (!userAddress) {
      // No wallet connected, prompt user to connect wallet
      await createWallet();
    }
    if (userAddress) {
      await getEthConversionRate();
      handleSend();
      handleModalClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md">
        <h2 className="text-h5 mb-4">Confirm Payment Details</h2>
        <div className="mb-4">
          <p className="text-gray-700 text-sm flex justify-between">
            <span>Wallet Address:</span>
            <span>{address}</span>
          </p>
          <p className="text-gray-700 text-sm flex justify-between">
            <span>Amount (USD):</span>
            <span>{amount.toFixed(2)}</span>
          </p>
          <p className="text-gray-700 text-sm flex justify-between">
            <span>Note:</span>
            <span>{noteText}</span>
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
