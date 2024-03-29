import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction, useEthers} from "@usedapp/core"
import AstroSwapExchange from "../chain-info/contracts/AstroSwapExchange.json";

export interface ExchangeInfoProps {
    ExchangeAddress: string;
}

export const ExchangeInfo = ({ExchangeAddress}: ExchangeInfoProps) => {
    const { abi: ExchangeABI } = AstroSwapExchange
    const ExchangeInterface = new utils.Interface(ExchangeABI)
    console.log(ExchangeAddress)
    const EthPool = Number(useContractCall({ abi: ExchangeInterface, address: ExchangeAddress[0], method: "ethPool", args: []}) ?? 0)
    const TokenPool = Number(useContractCall({ abi: ExchangeInterface, address: ExchangeAddress[0], method: "tokenPool", args: [], }) ?? 0)

    return (
        <p>
            <b>Exchange: </b>Ether Pool: {EthPool} (Wei) Token Pool: {TokenPool} (Wei)
        </p>
    )
}