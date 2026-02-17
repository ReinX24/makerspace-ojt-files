import { createDAppKit } from "@mysten/dapp-kit-react";
import { SuiGrpcClient } from "@mysten/sui/grpc";

const getGrpcUrl = (network: string) =>
  `https://fullnode.${network}.sui.io:443`;

export const dAppKit = createDAppKit({
  networks: ["devnet", "testnet", "mainnet"],
  defaultNetwork: "devnet",
  createClient(network) {
    return new SuiGrpcClient({
      network,
      baseUrl: getGrpcUrl(network),
    });
  },
});
