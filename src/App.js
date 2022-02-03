import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [exchange, setExchange] = useState(0);
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChange = (event) => {
    setMoney(event.target.value);
  };
  const handleChange = (event) => {
    setExchange(money / event.target.value);
  };
  const onSubmit = (event) => event.preventDefault();
  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <form onSubmit={onSubmit}>
          <label>USD</label>
          <input onChange={onChange} value={money} type='number'></input>
          <select onChange={handleChange}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>
          <h2>USD {exchange}</h2>
        </form>
      )}
    </div>
  );
}

export default App;
