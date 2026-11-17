
# RESTy — Lab 28 UML Diagram

```mermaid
flowchart TD
    A["App: request parameters, response data, loading state"]
    H["Header"]
    F["Form: URL, method, optional JSON body"]
    E["App useEffect: fetch when submitted parameters change"]
    API["API endpoint"]
    R["Results: props-driven headers and color-coded JSON"]
    FT["Footer"]

    A --> H
    A -->|handleApiCall callback| F
    F -->|GET, POST, PUT, PATCH, DELETE parameters| A
    A -->|requestParams| E
    E -->|HTTP request| API
    API -->|Response headers and body; 204 has no body| E
    E -->|Update response and loading state| A
    A -->|data and loading props| R
    A --> FT
```

POST, PUT, and PATCH support JSON request bodies. Results receives all data through props and displays HTTP 204 results as `null`.

During integration tests, MSW v2 intercepts HTTP requests. Automated coverage includes GET, POST, PATCH, and DELETE; PUT is supported by the application but is not covered by these tests.
