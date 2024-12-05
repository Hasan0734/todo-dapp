import { hardhat, localhost } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { injected } from "wagmi/connectors";


const wagmiConfig = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [hardhat],
  connectors: [injected()],
  transports: {
    [hardhat.id]: http(`http://127.0.0.1:8545`),
  },

}); 

export default wagmiConfig;
