// AddressForm.js

import React from 'react';
import { AddressElement } from '@stripe/react-stripe-js';

const AddressForm = () => {
  return (
    <form>
      <h3>Shipping Address</h3>
      <AddressElement options={{
            mode: "shipping",
            defaultValues: {
                name: '',
                address: {
                line1: '',
                line2: '',
                city: '',
                state: '',
                postal_code: '',
                country: '',
                },
            },
        }} />
    </form>
  );
};

export default AddressForm;
