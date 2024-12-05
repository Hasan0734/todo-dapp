import React, { useEffect } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import CustomConnect from "./ConnectButton";
import { baseAPI } from "@/lib/utils";
import { useAccount, useDisconnect, useSignMessage, useChainId } from "wagmi";
import { SiweMessage } from "siwe";
import toast from "react-hot-toast";

import { useSessionStore } from "@/store";

const SignInButton = () => {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected, isDisconnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnectAsync } = useDisconnect();

  const chainId = useChainId();


  const {
    nonce: storeNonce,
    setNonce,
    setError,
    setLoading,
    loading,
    error,
    setAuth,
    auth,
  } = useSessionStore((state) => state);

  useEffect(() => {
    if (isConnected && !storeNonce && !auth) {
      signInWithEthereum();
    }
  }, [isConnected, !storeNonce, !auth]);

  useEffect(() => {
    if (isDisconnected) {
      setNonce(null);
      setAuth(null);
      setLoading(false);
      setError(null);
    }
  }, [isDisconnected]);

  async function getMessage(address, statement) {
    try {
      const res = await fetch(`${baseAPI}/auth/nonce`, {
        method: "POST",
        body: JSON.stringify({ address: address, statement: statement }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const nonce = await res.text();
      setNonce(nonce);

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
      return message;
    } catch (error) {
      setError(error);
    }
  }

  const signInWithEthereum = async () => {
    try {
      if (!isConnected) {
       const res = openConnectModal?.(); // Trigger the wallet connect modal if not connected
       console.log({res})
        return;
      }

      if (!address || !chainId) return;

      setLoading(true);

      const message = await getMessage(
        address,
        "Sign in with Ethereum to the app."
      );
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const res = await fetch(`${baseAPI}/auth/verify`, {
        method: "POST",
        credentials: "include", // Include cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          signature,
          message: message,
        }),
      });

      if (!res.ok) {
        toast.error("Your are not varified!");
        throw new Error("Error verifying message");
      }

      setLoading(false);
      setAuth(address);
      // onSuccess({ address })
    } catch (error) {
      console.error(error.message);
      toast.error(error.message)
      await disconnectAsync();

      setNonce(null);
      setLoading(false);
      setError(error);
      setAuth(null);
    }
  };

  return (
    <>
      <CustomConnect handleAuth={signInWithEthereum} />
    </>
  );
};

export default SignInButton;
