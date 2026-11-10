import { useState } from 'react';

import './Form.scss';

function Form({ handleApiCall }) {

  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      method: method,
      url: url,
      body: requestBody,
    };

    handleApiCall(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
                    <input
            name="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span id="get" className={method === 'GET' ? 'selected' : ''} onClick={() => setMethod('GET')}>GET</span>

          <span id="post" className={method === 'POST' ? 'selected' : ''} onClick={() => setMethod('POST')}>POST</span>

          <span id="put" className={method === 'PUT' ? 'selected' : ''} onClick={() => setMethod('PUT')}>PUT</span>

          <span id="delete" className={method === 'DELETE' ? 'selected' : ''} onClick={() => setMethod('DELETE')}>DELETE</span>

        </label>
{(method === 'POST' || method === 'PUT') && (
  <label>
    JSON Body:
    <textarea
      value={requestBody}
      onChange={(e) => setRequestBody(e.target.value)}
      placeholder='{"name": "example"}'
    />
  </label>
)}
  </form>
    </>
  );
}

export default Form;
