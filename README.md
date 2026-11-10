
# RESTy

## Code 401 — Lab 27: Component State

RESTy is a React application that demonstrates a component-based interface for a REST API testing tool.

This first phase uses mock API data rather than making live HTTP requests.

## Features

- Displays an input field for an API URL.
- Displays GET, POST, PUT, and DELETE method options.
- Uses a GO button to submit mock request parameters.
- Displays the request method and URL.
- Renders a formatted JSON response using mock data.

**Current limitation:** RESTy uses mock API responses rather than making live HTTP requests. The URL, HTTP method, and optional POST/PUT request body are managed using React state.

## Technologies

- React
- JavaScript (JSX)
- Vite
- Sass (SCSS)
- ESLint

## Component Structure

- `App.jsx` — Functional component using `useState` to manage response data, request parameters, and loading state.
- `Header` — Function component that displays the application title.
- `Footer` — Function component that displays the footer.
- `Form` — Functional component using `useState` to manage the URL, HTTP method, and request body, then passes submitted parameters to App through a callback.
- `Results` — Functional component that receives response data and loading state through props, displaying mock response headers and formatted JSON results.

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

The test uses Vitest and React Testing Library to verify that submitting a GET request displays the request information and mock API results.


### Continuous Integration

GitHub Actions is configured to run automated tests on every push and pull request.

The workflow is defined in `.github/workflows/tests.yml` and runs `npm ci` followed by `npm test` using Node.js 24.


Create a production build:

```bash
npm run build
```

Manual browser verification confirms that clicking GO displays the mock request method, URL, and formatted JSON response.

## UML Diagram

[View RESTy UML Diagram](./assets/resty-uml.md)

## Repository

https://github.com/AGiv-lab/resty


## AI Assistance

ChatGPT assisted with explaining React state, reviewing code, troubleshooting, writing tests, and preparing documentation for Lab 27.

OpenAI Codex was used for read-only project inspection and recommendations. All changes were reviewed and implemented manually.