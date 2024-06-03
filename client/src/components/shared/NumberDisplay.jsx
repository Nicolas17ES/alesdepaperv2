import React from 'react';
import useNumberWithComma from '../../hooks/useNumberWithComa'; // Adjust the path as needed

function NumberDisplay({ number }) {
  const formattedNumber = useNumberWithComma(number);

  return <p>{formattedNumber}</p>;
}

export default NumberDisplay;