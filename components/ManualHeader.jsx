import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function header() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis();

    useEffect(() => {
        if (localStorage.getItem("account")) {
            enableWeb3();
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`);
            if (account === null) {
                localStorage.removeItem("account");
                deactivateWeb3();
                console.log("disconnected");
            }
        });
    }, []);

    return (
        <div>
            {account ? (
                <div>Connected to {account}</div>
            ) : (
                <button
                    disabled={isWeb3EnableLoading}
                    onClick={async () => {
                        await enableWeb3();
                        localStorage.setItem("account", account);
                    }}
                >
                    Connect
                </button>
            )}
        </div>
    );
}
