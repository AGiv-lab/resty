import React, { useState, useEffect } from 'react';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {

 const [data, setData] = useState(null);
 const [requestParams, setRequestParams] = useState({});
 const [loading, setLoading] = useState(false);

  const callApi = (requestParams) => {
  setRequestParams(requestParams);
};

useEffect(() => {
  if (!requestParams.url) return;

const fetchData = async () => {
  setLoading(true);

  try {
    const response = await fetch(requestParams.url, {
      method: requestParams.method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(requestParams.body &&
        ['POST', 'PUT'].includes(requestParams.method)
        ? { body: requestParams.body }
        : {}),
    });

    const results = await response.json();

    setData({
      headers: Object.fromEntries(response.headers.entries()),
      results,
    });
  } catch (error) {
    setData({
      headers: {},
      results: { error: error.message },
    });
  } finally {
    setLoading(false);
  }
};

fetchData();
}, [requestParams]);

    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
        <Form handleApiCall={callApi} />
        <Results data={data} loading={loading} />
        <Footer />
      </React.Fragment>
    );
}

export default App;
