import React from 'react';
import { DAppProvider, Rinkeby } from '@usedapp/core';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Box } from '@mui/material';
import './App.css';
import { lightBlue } from '@mui/material/colors';

function App() {
  const bgColour = lightBlue[900];
  return (
    <DAppProvider config={{
      networks: [Rinkeby],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000,
      }
    }}>
      <div className="App">
        <Box sx={{ border: 1, borderWidth: 3, borderColor: "lightBlue" , borderRadius: 5, backgroundColor:bgColour, padding: 5 }}>
          <Header /> 
          <Main />
        </Box>
      </div>
    </DAppProvider>
    
  );
}

export default App;