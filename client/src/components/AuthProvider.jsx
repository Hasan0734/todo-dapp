import React, { useEffect, useState } from "react";

import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import { createSiweMessage } from "viem/siwe";
import { useAccount, useDisconnect } from "wagmi";
import axios from "axios";
import { baseAPI } from "@/lib/utils";

const AuthProvider = ({ children }) => {
  const { address } = useAccount();
  const [status, setStatus] = useState("loading");

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const { data } = await axios.post(baseAPI + "/auth/nonce", {
        address,
      });
      
      return data.nonce;
    },
    // createMessage: ({ nonce }) => nonce,

    createMessage: ({ nonce, address, chainId }) => {
      return createSiweMessage({
        domain: window.location.host,
        address,
        statement: "This transaction does not have any cost",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
    },
    verify: async ({ message, signature }) => {
      try {
        setStatus("loading");
        const { data } = await axios.post(baseAPI + "/auth/verify", {
          address,
          message,
          signature,
        });
        return data.ok;
      } catch (error) {
        return false;
      }
    },
    signOut: async () => {
      await fetch("/api/logout");
    },
  });

  const [authenticationStatus, setAuthenticationStatus] = useState("loading");

  const { disconnect } = useDisconnect();

  useEffect(() => {

  }, []);

  return (
    <RainbowKitAuthenticationProvider
      adapter={authenticationAdapter}
      status={status}
    >
      {children}
    </RainbowKitAuthenticationProvider>
  );
};

export default AuthProvider;
