// A component to connect the user's web3 provider to the app
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useEthers } from "@usedapp/core";

export const Connect = () => {
    const {account, error, activateBrowserWallet, deactivate} = useEthers();
    const isConnected = account !== undefined;
    const shortAddress = account?.substring(0, 6) + "..." + account?.substring(account?.length - 4);

    return (
        <Stack spacing={2} direction="row-reverse">
            {isConnected ? (
                <Button style={{maxWidth: '170px', maxHeight: '60px', minWidth: '170px', minHeight: '60px'}} color="secondary" variant="outlined" onClick={deactivate}> Disconnect from {shortAddress}</Button>
            ) : (
                <Button style={{maxWidth: '170px', maxHeight: '60px', minWidth: '170px', minHeight: '60px'}} color="primary" variant="contained" onClick={() => activateBrowserWallet()}>Connect</Button>
            )}
            {error?.name ?(
                <Alert severity="error">{error.message}</Alert>
            ) : (
                null
            )}  
        </Stack>
    )
}