import React from 'react';
import { DAppProvider, Rinkeby } from '@usedapp/core';
import './App.css';

function App() {
  return (
    <DAppProvider config={{
      networks: [Rinkeby],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000,
      }
    }}>
      <div className="App">
        This is a blockchain APP
      </div>
    </DAppProvider>
    
  );
}

export default App;