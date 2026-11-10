import './Results.scss';

function Results({ data, loading }) {
 if (loading) return <p>Loading...</p>;
  return (

    <section>
<h3>Response Headers</h3>
<pre>{data ? JSON.stringify(data.headers, null, 2) : null}</pre>
<h3>Response Results</h3>
<pre>
{data ? JSON.stringify({ count: data.count, results: data.results }, null, 2) : null}
      </pre>
    </section>
  );
}

export default Results;
