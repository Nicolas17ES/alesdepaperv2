import { useMemo } from 'react';

/**
 * Hook to format a number with a comma.
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number.
 */
const useNumberWithComma = (number) => {
  const formattedNumber = useMemo(() => {
    const str = number.toString();
    if (str.length <= 2) return `0,${str.padStart(2, '0')}`; // Ensure at least 2 digits
    return `${str.slice(0, -2)},${str.slice(-2)}`;
  }, [number]);

  return formattedNumber;
};

export default useNumberWithComma;
