import { useEthers } from "@usedapp/core"
import networkMapping from "../chain-info/deployments/map.json"
import helperConfig from "../helper-config.json"
import { constants } from "ethers";
import { Stack } from '@mui/material';
import AstroSwapLogoV164x from "../images/AstroSwapLogoV164x.png"


export const Main = () => {
    const { chainId } = useEthers();
    const network = chainId ? helperConfig[chainId] : "development";
    const AstroSwapFactory: string = chainId ? networkMapping[String(chainId)]["AstroSwapFactory"][0] : constants.AddressZero
    return (
        <div>
            {chainId ? (
                <p>Using contract {AstroSwapFactory} on {chainId ? network : "disconnected"} network.</p>
                
            ) : (
                <p>No network connected. Please click the <b>connect button</b> in the top right! Currently supported networks: Rinkeby.</p>
            )}
            { chainId && AstroSwapFactory !== constants.AddressZero ? <p>Burgy</p> : null }
            { chainId && AstroSwapFactory === constants.AddressZero ? <p>No AstroSwapFactory contract deployed on this network.</p> : null }
        </div>
    ) 
}