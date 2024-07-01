import React from "react";
import QRCode from "qrcode.react";
import Button from "./Button";
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

interface FundWalletModalProps {
  handleModalClose: () => void;
  walletAddress: string;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({
  handleModalClose,
}) => {
  const { address: userAddress } = useAccount();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-primary-100 p-6 rounded-lg shadow-4xl w-full max-w-md">
        <h2 className="text-h5 mb-4">Fund Wallet</h2>
        <div className="mb-4 flex justify-center">
          <QRCode value={`${userAddress}`} size={200} />
        </div>
        <div className="mb-4 text-center">
          <p className="text-gray-700 text-sm font-bold">Wallet Address</p>
          <p className="text-gray-700 text-sm">{userAddress}</p>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleModalClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FundWalletModal;
