import { useContext } from 'react';
import { EthereumContext } from 'EthereumProvider';

const useEthereum = () => {
  const context = useContext(EthereumContext);

  if (!context) {
    throw new Error('useEthereum must be used within an EthereumProvider');
  }

  return context;
};

export default useEthereum;
