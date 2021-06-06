import React from 'react';

const GetJWT = (url, jwt) => {
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState(null);

  React.useEffect(async () => {
    setError('');

    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: jwt,
      },
    };

    let response = await fetch(url, fetchOptions);
    // console.log(response)

    if (response.ok) {
      try {
        let rawData = await response.json();
        // console.log(rawData)
        setData(rawData);
      } catch (error) {
        console.log(error);
      }
    }

    if (response.status === 401) {
      setError('Greska u kredencijalima');
    }
  }, [url, jwt]);

  return {data, error};
};

export default GetJWT;
