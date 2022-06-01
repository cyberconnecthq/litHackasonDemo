import { HARDHAT_PORT, HARDHAT_PRIVATE_KEY } from '@env';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import localhost from 'react-native-localhost';
import Web3 from 'web3';
import Hello from '../artifacts/contracts/Hello.sol/Hello.json';
import LitJsSdk from 'lit-js-sdk';

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  // eslint-disable-next-line react-native/no-color-literals
  white: { backgroundColor: 'white' },
  title: { color: 'blue', fontWeight: '600' },
});

const shouldDeployContract = async (web3, abi, data, from: string) => {
  const deployment = new web3.eth.Contract(abi).deploy({ data });
  const gas = await deployment.estimateGas();
  const {
    options: { address: contractAddress },
  } = await deployment.send({ from, gas });
  return new web3.eth.Contract(abi, contractAddress);
};

export default function App(): JSX.Element {
  const connector = useWalletConnect();
  const litClient = new LitJsSdk.LitNodeClient();
  const [message, setMessage] = React.useState<string>('Loading...');

  const web3 = React.useMemo(
    () => new Web3(new Web3.providers.HttpProvider(`http://${localhost}:${HARDHAT_PORT}`)),
    [HARDHAT_PORT]
  );

  React.useEffect(() => {
    void (async () => {
      const { address } = await web3.eth.accounts.privateKeyToAccount(HARDHAT_PRIVATE_KEY);
      const contract = await shouldDeployContract(
        web3,
        Hello.abi,
        Hello.bytecode,
        address
      );
      setMessage(await contract.methods.sayHello('React Native').call());
    })();
  }, [web3, shouldDeployContract, setMessage, HARDHAT_PRIVATE_KEY]);

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const signTransaction = React.useCallback(async () => {
    try {
       await connector.signTransaction({
        data: '0x',
        from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
        gas: '0x9c40',
        gasPrice: '0x02540be400',
        nonce: '0x0114',
        to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
        value: '0x00',
      });
    } catch (e) {
      console.error(e);
    }
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const connectLit = () => {
    litClient.connect();
    Alert.alert(
      litClient.ready ? "Lit is ready" : "Wait",
      "",
      litClient.ready ? [
        { text: "task 1", onPress: async () => {
          try {
            const chain = 'ethereum';
            const authSig = await LitJsSdk.checkAndSignAuthMessage({chain});
            
          } catch(e) {
            console.log(e);
          }
        } },
        { text: "task 2", onPress: () => {

        } },
        { text: "task 3", onPress: () => {

        } },
        { text: "Cancel", onPress: () => console.log("Cancel") }
      ] : [
        { text: "OK", onPress: () => console.log("OK") }
      ]
    );
  };

  return (
    <View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
      {!connector.connected && (
        <>
          <TouchableOpacity onPress={connectWallet}>
            <Text style={styles.title}>Connect a Wallet{"\n\n"}</Text>
          </TouchableOpacity>
        </>
      )}
      {connector.connected && (
        <>
          <Text testID="tid-message">Address: {connector.accounts[0]}{"\n\n"}</Text>
          <TouchableOpacity onPress={signTransaction}>
            <Text style={styles.title}>Sign a Transaction{"\n\n"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={killSession}>
            <Text style={styles.title}>Kill Session{"\n\n"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={connectLit}>
            <Text style={styles.title}>Connect Lit{"\n\n"}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}