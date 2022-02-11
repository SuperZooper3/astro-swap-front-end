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
    const TokenInterface = new utils.Interface(ExchangeABI)
    const EthPool = useContractCall({ abi: ExchangeABI, address: ExchangeAddress, method: "ethPool", args: []}) ?? 0
    const TokenPool = useContractCall({ abi: ExchangeABI, address: ExchangeAddress, method: "tokenPool", args: [], }) ?? 0

    return (
        <p>
            <b>Exchange: </b>Ether Pool: {EthPool} Token Pool: {TokenPool}
        </p>
    )
}