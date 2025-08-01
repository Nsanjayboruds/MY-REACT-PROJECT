import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((res) => {
                setData(res[currency]);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching currency data:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [currency]);

    return { data, loading, error };
}

export default useCurrencyInfo;