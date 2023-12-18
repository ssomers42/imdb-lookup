import { useState } from 'react';

function App() {
  const [year, setYear] = useState();

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `./getMovies/?yearInput=${year}`;
  };

  return (
    <>
      <h1>{`Hello World, it's the year ${year}`}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="yearInput">Enter a year</label>
        <input
          type="number"
          name="yearInput"
          id="yearInput"
          min={1920}
          max={2023}
          value={year}
          onChange={handleYearChange}
        />
        <button type="submit">SEARCH</button>
      </form>
    </>
  );
}

export default App;
