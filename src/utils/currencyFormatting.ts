export const formatCurrencyPLN = (amount: number, locale = "pl-PL") => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "PLN",
    currencyDisplay: "symbol", // This will use the symbol, which is zł for Polish Zloty
  });
  return formatter.format(amount);
};

/**
 * Formats a number using the Intl.NumberFormat API for better readability.
 * @param num The number to format.
 * @param locale The locale string, defaults to 'en-US' for U.S. number formatting.
 * @returns A formatted string representation of the number.
 */
export const formatNumber = (num: number, locale: string = "en-US"): string => {
  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0, // No decimal places for whole numbers
    minimumFractionDigits: 0, // Ensure that there are no unnecessary decimals
  });
  return formatter.format(num);
};
