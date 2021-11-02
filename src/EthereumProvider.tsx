import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

const EthereumContext = createContext<{
  account: string;
  connectWallet: () => Promise<void>;
  isEthereumAvailable: boolean;
} | null>(null);

const EthereumProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState('');
  const [isEthereumAvailable, setEthereumAvailable] = useState(false);

  const connectWallet = useCallback(async () => {
    const { ethereum } = window as any;

    if (!ethereum) {
      setEthereumAvailable(false);
      return;
    }
    setEthereumAvailable(true);

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    setAccount(accounts[0]);
  }, [window]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  const value = {
    account,
    connectWallet,
    isEthereumAvailable,
  };

  return (
    <EthereumContext.Provider value={value}>
      {children}
    </EthereumContext.Provider>
  );
};

export { EthereumContext };

export default EthereumProvider;
