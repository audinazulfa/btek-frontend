import React from 'react';

function Counter() {
  const [counter, setCounter] = React.useState(1);

  const minus = () => {
    // console.log('Klik button -');
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      // window.alert('Tidak dapat dikurang lagi!');
    }
  };

  const plus = () => {
    // console.log('Klik button +');
    if (counter < 9) {
      setCounter(counter + 1);
    } else {
      // window.alert('Tidak dapat ditambah lagi!');
    }
  };

  return (
    <div className="wrapper">
      <div className="counter">
        <div>
          <button type="button" onClick={minus} className="btn">-</button>
        </div>
      </div>
      <div className="number">{counter}</div>
      <div>
        <button type="button" onClick={plus} className="btn">+</button>
      </div>
    </div>
  );
}

export default Counter;
