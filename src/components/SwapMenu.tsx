import { useContractCall, useContractFunction, useEthers} from "@usedapp/core"
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers"
import AstroSwapExchange from "../chain-info/contracts/AstroSwapExchange.json";
import AstroSwapFactory from "../chain-info/contracts/AstroSwapFactory.json";
import { Button, Alert, Stack, TextField, InputLabel, Select, MenuItem} from "@mui/material";
import { useState } from "react";
import { isAddress } from "./helpers/Address"
import {TokenInfo} from "./TokenInfo";
import { ExchangeInfo } from "./ExchangeInfo";

export interface SwapProps {
    FactoryAddress: string;
}

export const SwapMenu = ({FactoryAddress}: SwapProps) => {
    const { account } = useEthers()
    const { abi: FactoryABI } = AstroSwapFactory
    const { abi: ExchangeABI } = AstroSwapExchange;
    const FactoryInterface = new utils.Interface( FactoryABI )
    
    const exchangeCount = useContractCall(
        {
            abi: FactoryInterface,
            address: FactoryAddress,
            method: "exchangeCount",
            args: []
        }
        ) ?? []
    const FactoryContract = new Contract(FactoryAddress, FactoryABI)
    // const { state: collectState , send: collectSend} = useContractFunction(RaffleContract, "ClaimRaffle", {transactionName: "Purchase Tickets"})
    // const handleCollect = () => {
    //     collectSend(id)
    // }
    
    const [tokenAddress, setTokenAddress] = useState<string>("0")
    const handleTknAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {setTokenAddress(event.target.value === "" ? "0" : event.target.value.toLowerCase())};
    const [swapAmount, setSwapAmount] = useState<Number>(0)
    const handleSwapAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {setSwapAmount(event.target.value === 0 ? 0 : event.target.value)};
    const isValidAddress = isAddress(tokenAddress)
    const [swapType, setSwapType] = useState<Number>(0)
    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {setSwapType(event.target.value as Number)};
    console.log(swapType)
    console.log(isValidAddress)
    const exchangeAddress = useContractCall({ abi: FactoryInterface, address: FactoryAddress,  method: "convertTokenToExchange", args: [tokenAddress]}) ?? "0x0000000000000000000000000000000000000000"
    console.log(exchangeAddress)
    const ExchangeContract = new Contract("0x9D73Ef17B4Ba73EACB1f6CA00B26B4C3e15260Bb", ExchangeABI)
    let swapFunction;
    if (swapType === 0) {swapFunction = "tokenToEth"}
    else if (swapType === 1) {swapFunction = "tokenToToken"}
    else if (swapType === 2) {swapFunction = "ethToToken"}
    const { state: swapState , send: swapSend } = useContractFunction(ExchangeContract, swapFunction, {transactionName: "Swap"})
    const handleSwap = () => {
        swapSend(account, swapAmount, 0)
    }
    // Set up the elements
    let exchangeAddressAlert;
    if (!isValidAddress) {
        exchangeAddressAlert = <Alert severity="warning">Invalid token address</Alert>
    }
    else if (exchangeAddress == "0x0000000000000000000000000000000000000000") {
        exchangeAddressAlert = <Alert severity="error">There is no exchange for this token</Alert>
    }
    else {
        exchangeAddressAlert = <Alert severity="info"> The exchange for this token is at {exchangeAddress}</Alert>
    }

    return (
        <div>
        <p>There are currently {Number(exchangeCount)} exchanges.</p>
        <Stack direction="column" justifyContent="flex-start" alignItems="left" spacing={2}>
            <TextField label="Token" onChange={handleTknAddressChange} style={{maxWidth: '420px', maxHeight: '60px', minWidth: '420px', minHeight: '60px'}}/>
            {exchangeAddressAlert}
            {isValidAddress && exchangeAddress != "0x0000000000000000000000000000000000000000" ?
            <div>
                <ExchangeInfo ExchangeAddress={exchangeAddress}/>
                <TokenInfo TokenAddress={tokenAddress}/>
                <br/>
                <Stack direction="row" spacing={2}>
                    <Select value={swapType} onChange={handleTypeChange}>
                        <MenuItem value={0}>Swap to Ether</MenuItem>
                        <MenuItem value={1}>Swap to Token</MenuItem>
                        <MenuItem value={2}>Swap from Ether</MenuItem>
                    </Select>
                    <TextField label="Amount to swap" type="number" onChange={handleSwapAmountChange}/>
                    <Button color="primary" variant="contained" onClick={handleSwap}>Swap!</Button>
                </Stack>
            </div>
            : null}
        </Stack>
        </div>
    )
}