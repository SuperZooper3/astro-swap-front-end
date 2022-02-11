import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import { constants } from 'ethers';
import { useEthers } from '@usedapp/core';
import networkMapping from "../chain-info/deployments/map.json"
import {SwapMenu} from "./SwapMenu";
import {PoolsMenu} from "./PoolsMenu";

export const InteractionMenu = () => {
    const { chainId } = useEthers();
    const AstroSwapFactoryAddress: string = chainId ? networkMapping[String(chainId)]["AstroSwapFactory"][0] : constants.AddressZero
    const [tabValue, setTabValue] = React.useState('1');
    const handleTabChange = (event, newValue) => {setTabValue(newValue);};
    return (
        <div className="interaction-menu">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="Interaction Tab List" centered>
                            <Tab label="Swap" value="1" />
                            <Tab label="Pools" value="2" />
                            <Tab label="Investments" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <h2>Swap</h2>
                        <SwapMenu FactoryAddress={AstroSwapFactoryAddress} />
                    </TabPanel>
                    <TabPanel value="2">
                        <h2>Pools</h2>
                        <PoolsMenu FactoryAddress={AstroSwapFactoryAddress} />
                    </TabPanel>
                    <TabPanel value="3">
                        <h2>Investments</h2>  
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}