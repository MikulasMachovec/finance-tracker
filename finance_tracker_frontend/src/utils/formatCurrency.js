export const formatCurrency = (amount, currency = "EUR") => {
    const value = Number(amount) || 0;

    if (currency === "USD") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "symbol",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    }

    const formattedValue = new Intl.NumberFormat("sk-SK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

    return `${formattedValue} €`;
};