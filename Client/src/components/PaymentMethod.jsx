import React, { useState } from 'react';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('budget');

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="mpesa"
          checked={paymentMethod === 'mpesa'}
          onChange={handleChange}
        />
        Mpesa
      </label>
      <label>
        <input
          type="radio"
          value="cash"
          checked={paymentMethod === 'cash'}
          onChange={handleChange}
        />
        Cash
      </label>
      <label>
        <input
          type="radio"
          value="budget"
          checked={paymentMethod === 'budget'}
          onChange={handleChange}
        />
        Budget
      </label>
    </div>
  );
};

export default PaymentMethod;