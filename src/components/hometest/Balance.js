import React from 'react'
import './balance.css'
    
    

function Balance() {
return (
    <div className="balance-home">
        <div className="balance-header">
      <h2>Your Balance</h2>
      </div>
      <h3>${}</h3>
      <div className="income-expense-home">
        <div className="plus-home">
          <h3>Income</h3>
          <p>+${}</p>
        </div>
        <div className="minus-home">
          <h3>Expenses</h3>
          <p>-${}</p>
        </div>
      </div>
    </div>
  );
};
export default Balance;
