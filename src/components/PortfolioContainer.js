import React from "react";
import Stock from "./Stock";

function PortfolioContainer({portfolio,onStock}) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        portfolio.map(stock => <Stock key={stock.id} stock={stock} onStock={onStock}/>)
      }
    </div>
  );
}

export default PortfolioContainer;
