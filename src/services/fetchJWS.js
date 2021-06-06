const fetchJWS = (url, jwt) => {
  const sendData = async object => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: jwt,
      },
      body: JSON.stringify(object),
    };

    let response = await fetch(url, fetchOptions);
    // console.log(response)

    if (response.ok) {
      return 'Added';
    } else {
      return response.statusText;
    }
  };

  return {sendData};
};

export default fetchJWS;
