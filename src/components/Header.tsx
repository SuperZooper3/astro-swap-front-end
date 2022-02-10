import { Connect } from './Connect';
import { Stack } from '@mui/material';
import FullLogo from "../images/AstroSwapLogoV1.png"


export const Header = () => {
    return (
        <div className="header">
            <Stack spacing={2} direction="row" justifyContent="space-between">
                <img src={FullLogo} alt="Astro Swap Logo" height={100} width={100}/>
                <h1>Astro Swap</h1>
                <Connect /> 
            </Stack>
        </div>
    );
};
