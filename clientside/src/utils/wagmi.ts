import { http, createConfig } from "wagmi";
import { baseSepolia, klaytnBaobab, sepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    coinbaseWallet({
      appName: "Create Wagmi",
      preference: "smartWalletOnly",
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
