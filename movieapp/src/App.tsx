import { useState, useEffect } from "react";
import algosdk from "algosdk";
import { Buffer } from "buffer";
import { PeraWalletConnect } from "@perawallet/connect";

import "./App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState<string | null>();
  const [voteState1, setVoteState1] = useState("Vote");
  const [voteState2, setVoteState2] = useState("Vote");
  const [voteState3, setVoteState3] = useState("Vote");
  const [voteState4, setVoteState4] = useState("Vote");
  const [Count1, setCount1] = useState(0);
  const [Count2, setCount2] = useState(0);
  const [Count3, setCount3] = useState(0);
  const [Count4, setCount4] = useState(0);
  const [walletbalance, setwalletbalance] = useState<number>(0);

  const peraWallet = new PeraWalletConnect({
    
    chainId: 416002,
    shouldShowSignTxnToast: true,
  });

  const app_address: number = 655668572;

  const baseServer = "https://testnet-api.algonode.cloud";

  const algodClient = new algosdk.Algodv2("", baseServer, "");

  const walletConnectStatus = () => {
    return !!currentAccount;
  };

  const handleConnectWalletClick = async () => {
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

        setCurrentAccount(newAccounts[0]);
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  };

  const handleDisconnectWalletClick = () => {
    peraWallet.disconnect();
    setCurrentAccount(null);
  };

  const addC1 = async () => {
    if (!currentAccount) {
      console.log("Please connect wallet");
      return;
    }
    let sender = currentAccount;
    let appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("AddC1")));
    let params = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeApplicationNoOpTxn(
      sender,
      params,
      app_address,
      appArgs
    );
    let txId = txn.txID().toString();

    // time to sign . . . which we have to do with walletconnect
    const SignerTransaction = [{ txn }];

    setVoteState1("Sign in wallet");

    const result = await peraWallet.signTransaction([SignerTransaction]);

    //const result = await connector.sendCustomRequest(request);
    const decodedResult = result.map((element: any) => {
      return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    });
    setVoteState1("Wait ...");
    await algodClient.sendRawTransaction(decodedResult as any).do();
    await algosdk.waitForConfirmation(algodClient, txId, 4);
    console.log("Adding to Count1");
    let transactionResponse = await algodClient
      .pendingTransactionInformation(txId)
      .do();
    console.log("Called app-id:", transactionResponse["txn"]["txn"]["apid"]);
    if (transactionResponse["global-state-delta"] !== undefined) {
      console.log(
        "Global State updated:",
        transactionResponse["global-state-delta"]
      );
      await getCount();
    }
    setVoteState1("Vote");
  };

  const addC2 = async () => {
    if (!currentAccount) {
      console.log("Please connect wallet");
      return;
    }

    let sender = currentAccount;
    let appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("AddC2")));
    let params = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeApplicationNoOpTxn(
      sender,
      params,
      app_address,
      appArgs
    );
    let txId = txn.txID().toString();

    // time to sign . . . which we have to do with walletconnect
    const SignerTransaction = [{ txn }];

    setVoteState2("Sign in wallet");
    const result = await peraWallet.signTransaction([SignerTransaction]);
    const decodedResult = result.map((element: any) => {
      return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    });
    // send and await
    setVoteState2("Wait ...");
    await algodClient.sendRawTransaction(decodedResult as any).do();
    await algosdk.waitForConfirmation(algodClient, txId, 4);
    let transactionResponse = await algodClient
      .pendingTransactionInformation(txId)
      .do();
    console.log("Called app-id:", transactionResponse["txn"]["txn"]["apid"]);
    if (transactionResponse["global-state-delta"] !== undefined) {
      console.log(
        "Global State updated:",
        transactionResponse["global-state-delta"]
      );
      await getCount();
    }
    setVoteState2("Vote");
  };

  const addC3 = async () => {
    if (!currentAccount) {
      console.log("Please connect wallet");
      return;
    }

    let sender = currentAccount;
    let appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("AddC3")));
    let params = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeApplicationNoOpTxn(
      sender,
      params,
      app_address,
      appArgs
    );
    let txId = txn.txID().toString();

    // time to sign . . . which we have to do with walletconnect
    const SignerTransaction = [{ txn }];

    setVoteState3("Sign in wallet");
    const result = await peraWallet.signTransaction([SignerTransaction]);
    const decodedResult = result.map((element: any) => {
      return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    });
    // send and await
    setVoteState3("Wait ...");
    await algodClient.sendRawTransaction(decodedResult as any).do();
    await algosdk.waitForConfirmation(algodClient, txId, 4);
    let transactionResponse = await algodClient
      .pendingTransactionInformation(txId)
      .do();
    console.log("Called app-id:", transactionResponse["txn"]["txn"]["apid"]);
    if (transactionResponse["global-state-delta"] !== undefined) {
      console.log(
        "Global State updated:",
        transactionResponse["global-state-delta"]
      );
      await getCount();
    }
    setVoteState3("Vote");
  };

  const addC4 = async () => {
    if (!currentAccount) {
      console.log("Please connect wallet");
      return;
    }

    let sender = currentAccount;
    let appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("AddC4")));
    let params = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeApplicationNoOpTxn(
      sender,
      params,
      app_address,
      appArgs
    );
    let txId = txn.txID().toString();

    // time to sign . . . which we have to do with walletconnect
    const SignerTransaction = [{ txn }];

    setVoteState4("Sign in wallet");
    const result = await peraWallet.signTransaction([SignerTransaction]);
    const decodedResult = result.map((element: any) => {
      return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    });
    // send and await
    setVoteState4("Wait ...");
    await algodClient.sendRawTransaction(decodedResult as any).do();
    await algosdk.waitForConfirmation(algodClient, txId, 4);
    let transactionResponse = await algodClient
      .pendingTransactionInformation(txId)
      .do();
    console.log("Called app-id:", transactionResponse["txn"]["txn"]["apid"]);
    if (transactionResponse["global-state-delta"] !== undefined) {
      console.log(
        "Global State updated:",
        transactionResponse["global-state-delta"]
      );
      await getCount();
    }
    setVoteState4("Vote");
  };

  const getBalance = async () => {
    if (!currentAccount) {
      console.log("Please connect wallet");
      return;
    }
    let accountinfo = await algodClient.accountInformation(currentAccount).do();
    console.log(
      "Account Balance in Algo:",
      algosdk.microalgosToAlgos(accountinfo.amount)
    );
    setwalletbalance(algosdk.microalgosToAlgos(accountinfo.amount));
  };

  const getCount = async () => {
    let applicationInfoResponse = await algodClient
      .getApplicationByID(app_address)
      .do();
    let globalState = [];
    globalState = applicationInfoResponse["params"]["global-state"];
    console.log("Count1: ", globalState[0]["value"]["uint"]);
    setCount1(globalState[0]["value"]["uint"]);
    console.log("Count2: ", globalState[1]["value"]["uint"]);
    setCount2(globalState[1]["value"]["uint"]);
    console.log("Count3: ", globalState[2]["value"]["uint"]);
    setCount3(globalState[2]["value"]["uint"]);
    console.log("Count4: ", globalState[3]["value"]["uint"]);
    setCount4(globalState[3]["value"]["uint"]);
  };

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

        if (peraWallet.isConnected && accounts.length) {
          setCurrentAccount(accounts[0]);
        }
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });

    getCount();
    setVoteState1("Vote");
    setVoteState2("Vote");
    setVoteState3("Vote");
    setVoteState4("Vote");
    getBalance();
    console.log("currentAccount:", currentAccount);
  }, [currentAccount]);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">🎬 What kind of movie do you like?</div>
        <div className="bio">
          Vote for the better movie genre. Ensure your wallet is set to the{" "}
          <b>testnet</b>.
        </div>
        <div className="bio">Rules: Unlimited voting, get to clicking!</div>

        {!currentAccount && (
          <button className="walletButton" onClick={handleConnectWalletClick}>
            Connect Wallet
          </button>
        )}

        {currentAccount && (
          <>
            {walletbalance <= 0.01 && (
              <>
                <div className="bio">
                  You don't have enough testalgo in your wallet to vote. Follow
                  the link below to the test Algo faucet, fund your account,
                  then reload this page!
                </div>
                <a
                  href="https://bank.testnet.algorand.network/"
                  target="_blank"
                >
                  <div className="faucetlink">Test Algo Faucet</div>
                </a>
              </>
            )}
            {walletbalance > 0.01 && (
              <>
                <div className="movie-container">
                  <div className="movie-card">
                    <div className="title">Action</div>
                    <div className="count">{Count1}</div>
                    <button className="mathButton" onClick={addC1}>
                      {voteState1}
                    </button>
                  </div>
                  <div className="movie-card">
                    <div className="title">Horror</div>
                    <div className="count">{Count2}</div>
                    <button className="mathButton" onClick={addC2}>
                      {voteState2}
                    </button>
                  </div>
                  <div className="movie-card">
                    <div className="title">Comedy</div>
                    <div className="count">{Count3}</div>
                    <button className="mathButton" onClick={addC3}>
                      {voteState3}
                    </button>
                  </div>
                  <div className="movie-card">
                    <div className="title">Romance</div>
                    <div className="count">{Count4}</div>
                    <button className="mathButton" onClick={addC4}>
                      {voteState4}
                    </button>
                  </div>
                </div>
              </>
            )}
            <button
              className="disconnectwalletButton"
              onClick={handleDisconnectWalletClick}
            >
              Disconnect Wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
