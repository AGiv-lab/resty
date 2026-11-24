
# RESTy

## Code 401 — Lab 28: Effect Hook

RESTy is a React application that demonstrates a component-based interface for a REST API testing tool.

App uses `useEffect` and `fetch` to make live API requests when submitted request parameters change. MSW intercepts requests during automated tests.

## Features

- Displays an input field for an API URL.
- Supports GET, POST, PUT, PATCH, and DELETE requests.
- Uses a GO button to submit request parameters.
- Accepts JSON request bodies for POST, PUT, and PATCH.
- Displays the request method and URL.
- Displays loading feedback while a request is in progress.
- Displays response headers available to the browser and color-coded JSON results using `react-json-view-lite@2.5.0`.
- Handles HTTP 204 No Content without parsing an empty body; results are displayed as `null`.

The URL, HTTP method, and optional request body are managed using React state. Form submits parameters to App, where `useEffect` performs the request and updates the data passed to Results.

## Technologies

- React
- JavaScript (JSX)
- Vite
- Sass (SCSS)
- ESLint
- react-json-view-lite
- Vitest and React Testing Library
- MSW v2

## Component Structure

- `App.jsx` — Functional component using `useState` to manage response data, request parameters, and loading state. Its `useEffect` performs API requests with `fetch` when submitted parameters change.
- `Header` — Function component that displays the application title.
- `Footer` — Function component that displays the footer.
- `Form` — Functional component using `useState` to manage the URL, HTTP method, and request body, then passes submitted parameters to App through a callback.
- `Results` — Functional component driven entirely by response data and loading props. Displays response headers and results separately with color-coded JSON viewers, including `null` results for HTTP 204 responses.

Each component has its own SCSS stylesheet.

## Getting Started

Clone the repository:

```bash
git clone git@github.com:AGiv-lab/resty.git
cd resty
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite.

## Verification

Run ESLint:

```bash
npm run lint
```

Run automated tests:

```bash
npm test
```

Automated integration tests use Vitest, React Testing Library, and MSW v2 to submit requests through the React form. MSW intercepts HTTP requests and returns controlled responses.

- Supported HTTP methods: GET, POST, PUT, PATCH, and DELETE.
- Automated integration coverage: GET, POST, PATCH, and DELETE; PUT is not covered.
- POST and PATCH tests verify the actual method, URL, and parsed JSON body echoed by MSW, along with displayed response values.
- DELETE verifies the actual method and URL, an HTTP 204 response, and displayed `null` results without a JSON parsing error.

The developer reported all four integration tests passing after the JSON viewer assertion fixes. Codex did not run the tests. This checkpoint does not establish lint, build, or manual browser verification.


### Continuous Integration

GitHub Actions is configured to run automated tests on every push and pull request.

The workflow is defined in `.github/workflows/tests.yml` and runs `npm ci` followed by `npm test` using Node.js 24.


Create a production build:

```bash
npm run build
```

## UML Diagram

[View RESTy UML Diagram](./assets/resty-uml.md)

## Repository

https://github.com/AGiv-lab/resty


## AI Assistance

Earlier AI assistance included React state explanations, code review, troubleshooting, tests, and Lab 27 documentation. Exact prompts for that work, the initial effect-driven request implementation, and initial MSW/GET setup are not available in this conversation; they are summarized rather than quoted.

For Lab 28, Codex reviewed the project and implemented approved PATCH support, MSW handlers and integration tests, HTTP 204 handling, the JSON viewer, and assertion fixes. The developer approved changes, installed the viewer, ran tests, and reported results. Codex did not run tests or perform Git writes in this conversation. Documentation was updated with approval.

The following prompts are copied verbatim from this conversation.

<details>
<summary>PATCH implementation prompt</summary>

```text
Approved. Implement the three proposed PATCH changes in:

- `src/Components/Form/index.jsx`
- `src/App.jsx`

Preserve existing GET, POST, PUT, and DELETE behavior.

Do not modify any other files. Do not run terminal commands, tests, or Git operations without separate approval.

After editing, summarize the exact changes and stop for review.
```

</details>

<details>
<summary>JSON viewer implementation prompt</summary>

```text
Approved. Implement the proposed JSON viewer integration.

Authorized files only:

- `src/Components/Results/index.jsx`
- `src/Components/Results/Results.scss`
- `src/App.test.jsx`

Requirements:

1. Use `react-json-view-lite@2.5.0`.
2. Display response headers and results separately.
3. Preserve loading behavior and HTTP 204 null responses.
4. Keep Results driven entirely by props for future Lab 29 reuse.
5. Preserve all four HTTP-method tests and their existing request verification.
6. Adjust assertions only as necessary for the viewer's markup.
7. Do not modify App, Form, MSW handlers, or other files.
8. Do not implement Lab 29 features.

You may edit the three authorized files.

Do not run terminal commands, tests, installations, or Git operations without separate approval.

After editing, summarize the changes and stop for review.
```

</details>
