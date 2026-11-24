import { JsonView, allExpanded } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import './Results.scss';

function Results({ data, loading }) {
  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <h3 id="response-headers-heading">Response Headers</h3>
      <div
        role="region"
        aria-labelledby="response-headers-heading"
        className="json-response"
      >
        {data && (
          <JsonView
            data={data.headers}
            shouldExpandNode={allExpanded}
          />
        )}
      </div>

      <h3 id="response-results-heading">Response Results</h3>
      <div
        role="region"
        aria-labelledby="response-results-heading"
        className="json-response"
      >
        {data && (
          <JsonView
            data={{ results: data.results }}
            shouldExpandNode={allExpanded}
          />
        )}
      </div>
    </section>
  );
}

export default Results;
