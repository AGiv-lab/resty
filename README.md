
# RESTy

## Code 401 — Lab 26: Component-Based UI

RESTy is a React application that demonstrates a component-based interface for a REST API testing tool.

This first phase uses mock API data rather than making live HTTP requests.

## Features

- Displays an input field for an API URL.
- Displays GET, POST, PUT, and DELETE method options.
- Uses a GO button to submit mock request parameters.
- Displays the request method and URL.
- Renders a formatted JSON response using mock data.

**Current limitation:** The request method and URL are hardcoded for this phase. The method options and URL input do not yet control the request.

## Technologies

- React
- JavaScript (JSX)
- Vite
- Sass (SCSS)
- ESLint

## Component Structure

- `App.jsx` — Class component that manages application state and handles mock API calls.
- `Header` — Function component that displays the application title.
- `Footer` — Function component that displays the footer.
- `Form` — Function component that submits request parameters to App through a callback.
- `Results` — Function component that displays JSON data received through props.

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

Create a production build:

```bash
npm run build
```

Manual browser verification confirms that clicking GO displays the mock request method, URL, and formatted JSON response.

## UML Diagram

To be added for Lab 26.

## Repository

https://github.com/AGiv-lab/resty
