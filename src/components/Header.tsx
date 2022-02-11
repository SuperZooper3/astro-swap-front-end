import { Connect } from './Connect';
import { Stack } from '@mui/material';
import FullLogo from "../images/AstroSwapLogoV1.png"


export const Header = () => {
    return (
        <Stack spacing={20} direction="row" className="center">
            <img src={FullLogo} alt="Astro Swap Logo" height={170} width={170}/>
            <h1>Astro Swap</h1>
            <Connect /> 
        </Stack>
    );
};
