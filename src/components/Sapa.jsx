import React from 'react';

function Sapa({ name, birthDate }) {
  React.useEffect(() => {
    // console.log('I will run on props name updated');
  }, [name]); // sama seperti componentDidUpdate

  return (
    <div className="">
      Halo,
      {name}
      ! Your birthDate is
      {birthDate}
    </div>
  );
}

export default Sapa;
