import React,{useState,useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortMethod, setSortMethod] = useState("")
  const [filter, setFilter] = useState("Tech")

  useEffect(()=>{
    fetch(`http://localhost:3001/stocks?type=${filter}`)
    .then(res => res.json())
    .then(data => setStocks(data))
  },[filter])

  const sorting = (stocks) => {

    if(sortMethod==="Price"){
      return stocks.sort((firstItem, secondItem) => firstItem.price - secondItem.price)
    }else if(sortMethod==="Alphabetically"){
      return stocks.sort((firstItem, secondItem) => {
        return firstItem.ticker.localeCompare(secondItem.ticker); })
    }else{
      return stocks
    }
  }
   const buyStock = (boughtStock) => setPortfolio([...portfolio,boughtStock]) 
   const sellStock = (soldStock) => {
     const remainingStock = portfolio.filter(portfolioStock => portfolioStock.id !== soldStock.id)
     setPortfolio(remainingStock)
   }
  
  return (
    <div>
      <SearchBar 
      onFilter = {setFilter}
      onSort = {setSortMethod}
      sortMethod = {sortMethod}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={sorting(stocks)} onStock={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onStock={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
