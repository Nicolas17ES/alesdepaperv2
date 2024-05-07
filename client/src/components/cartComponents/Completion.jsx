import React, { useState } from "react";

const Completion = (props) => {
    const [orderId, setOrderId] = useState(23324)

  return (
    <>
      <h1>Thank you! 🎉</h1>
      <p>This is your order ID {}orderId</p>
    </>
  );
};

export default Completion;
