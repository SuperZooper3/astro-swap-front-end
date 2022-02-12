import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IERC20 from "../chain-info/contracts/IERC20.json";
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction, useEthers} from "@usedapp/core"

export interface TokenInfoProps {
    TokenAddress: string;
}

export const TokenInfo = ({TokenAddress}: TokenInfoProps) => {
    const { abi: TokenABI } = IERC20
    const { account } = useEthers()
    console.log("Account", account)
    const TokenInterface = new utils.Interface(TokenABI)
    const TokenName = useContractCall({ abi: TokenInterface, address: TokenAddress, method: "name", args: [], }) ?? "Unknown Name" 
    const TokenSymbol = useContractCall({ abi: TokenInterface, address: TokenAddress, method: "symbol", args: [], }) ?? "Unknown Symbol"
    const TokenDecimals = Number(useContractCall({ abi: TokenInterface, address: TokenAddress, method: "decimals", args: [], }) ?? "0")
    const TokenBalance = Number(useContractCall({ abi: TokenInterface, address: TokenAddress, method: "balanceOf", args: [account], }) ?? "0")
    const TokenTotalSupply = Number(useContractCall({ abi: TokenInterface, address: TokenAddress, method: "totalSupply", args: [], }) ?? "0")

    return (
        <Stack spacing={2} direction="row">
            <b>Token:</b> {TokenName} ({TokenSymbol}) Total Supply: {Math.round(Number(String(TokenTotalSupply/10**TokenDecimals)))} Your Balance: {TokenBalance/10**TokenDecimals}
        </Stack>
    )
}