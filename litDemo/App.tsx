/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import WalletConnectProvider, { useWalletConnect } from "react-native-walletconnect";
import {
  Alert,
  Button,
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const WalletConnectExample = () => {
  const {
    createSession,
    killSession,
    session,
    signTransaction,
  } = useWalletConnect();
  const hasWallet = !!session.length;
  const testVal = session
  return (
    <>
      {!hasWallet && (
        <Button title="Connect" onPress={createSession} />
      )}
      {!!hasWallet && (
        <Button
          title="Sign Transaction"
          onPress={() => signTransaction({
            from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3",
            to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359",
            data: "0x",
            gasPrice: "0x02540be400",
            gas: "0x9c40",
            value: "0x00", 
            nonce: "0x0114",
          })}
        />
      )}
      {!!hasWallet && (
        <Button
          title="Disconnect"
          onPress={killSession}
        />
      )}
      {!!hasWallet && (
        <Text>your public key is: {testVal[0].accounts[0]}</Text>
      )}
    </>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (__DEV__) {
    NativeModules.DevSettings.setIsDebuggingRemotely(true)
  }

  return (
    <WalletConnectProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <WalletConnectExample />
      </SafeAreaView>
    </WalletConnectProvider>
  );
};

export default App;
