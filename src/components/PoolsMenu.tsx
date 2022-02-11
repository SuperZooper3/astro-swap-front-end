import { useContractCall, useContractFunction, useEthers, useCall} from "@usedapp/core"
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers"
import AstroSwapExchange from "../chain-info/contracts/AstroSwapExchange.json";
import AstroSwapFactory from "../chain-info/contracts/AstroSwapFactory.json";
import { Button, Alert, Stack, TextField, InputLabel, Select, MenuItem} from "@mui/material";
import { useState } from "react";
import { isAddress } from "./helpers/Address"
import {TokenInfo} from "./TokenInfo";
import { ExchangeInfo } from "./ExchangeInfo";

export interface PoolProps {
    FactoryAddress: string;
}

export const PoolsMenu = ({FactoryAddress}: PoolProps) => {
    const { account } = useEthers()
    const { abi: FactoryABI } = AstroSwapFactory
    const { abi: ExchangeABI } = AstroSwapExchange;
    const FactoryInterface = new utils.Interface( FactoryABI )
    const ExchangeInterface = new utils.Interface( ExchangeABI )
    const FactoryContract = new Contract( FactoryAddress, FactoryABI)

    

    // Factory Info
    const exchangeCount = useContractCall(
        {
            abi: FactoryInterface,
            address: FactoryAddress,
            method: "exchangeCount",
            args: []
        }
        ) ?? []
    
    // Process buttons / inputs
    const [tokenAddress, setTokenAddress] = useState<string>("")
    const handleTknAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {setTokenAddress(event.target.value === "" ? "" : event.target.value.toLowerCase())};
    const isValidAddress = isAddress(tokenAddress)

    const { state: createPoolState , send: createPoolSend } = useContractFunction(FactoryContract, "addTokenExchange", {transactionName: "Create Pool"})
    const handleCreatePool = () => {
        console.log("Creating Pool")
        createPoolSend(tokenAddress)
        console.log(createPoolState)
    } 

    // Get the exchange address from the token
        

    // Setup elements
    let exchangeAddressAlert;
    if (tokenAddress !== "") {
        if (!isValidAddress) {
            exchangeAddressAlert = <Alert severity="warning">Invalid token address</Alert>
        }
        else if (exchangeAddress == "0x0000000000000000000000000000000000000000") {
            exchangeAddressAlert = <Alert severity="error">There is no exchange for this token</Alert>
        }
        else {
            exchangeAddressAlert = <Alert severity="success"> The exchange for this token is at {exchangeAddress}</Alert>
        }
    }
    const EthPool = 0;
    const TokenPool = 0;
    let fundingMenu;
    // Setup the funding menu
    if (isValidAddress && exchangeAddress[0] !== "0x0000000000000000000000000000000000000000") {
        if (EthPool == 0 && TokenPool == 0) {
            // Seed funding menu
            fundingMenu = <p>Seed</p>
        }
        else {
            // Normal funding menu
            fundingMenu = <p>Normal</p>
        }
    }

    return (
        <Stack direction="column" justifyContent="flex-start" alignItems="left" spacing={2}>
            <p>There are currently {Number(exchangeCount)} exchanges.</p>
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
                <TextField value={tokenAddress} label="Token" onChange={handleTknAddressChange} style={{maxWidth: '420px', maxHeight: '60px', minWidth: '420px', minHeight: '60px'}}/>
            </Stack>
            {isValidAddress ? <TokenInfo TokenAddress={tokenAddress}/>  : null}    
            {exchangeAddressAlert}
            {isValidAddress && exchangeAddress[0] == "0x0000000000000000000000000000000000000000" ? <Button color="secondary" variant="contained" onClick={handleCreatePool}>Create Pool</Button>  : null}
            {isValidAddress && exchangeAddress[0] !== "0x0000000000000000000000000000000000000000" ? <ExchangeInfo ExchangeAddress={exchangeAddress}/>  : null}
            {fundingMenu}
        </Stack>
    )
} 