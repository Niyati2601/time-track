### Time Tracking System




### Description

---> It helps people to track their daily task and time in their corporate environment

---> user will be able to add their daily tasks

---> user can be able to download timesheet of their performed task

#### Structure Overview

- /src/api folder contains API call handling
- /src/assets folder contains css (global) , images (static images)
- /src/components folder contains re-usable components
- /src/context folder manages user clockin/out and day/out functinality.
- /src/layouts folder contains layouts different layout for different screens such as (FullLayout, MainLayout and sidebar)
- /src/pages folder contains module specific folders and in that those module specific files (.JS & .SCSS)
- .env (Secure Configured details)

#### Prerequisites

- React 18.20+
- NODE 20.11
- react-hot-toast (Toaster Notification)
- react-router-dom

#### Dependencies


- `react`: React core library for building user interfaces.
- `react-data-table-component`: Data table component for React.
- `react-dom`: DOM-specific methods for React.
- `react-hot-toast`: Notification Library .
- `react-router-dom`: Routing library for React.
- `sass`: CSS preprocessor.
- `eslint-plugin-react`: An ESLint plugin to provide linting rules specific to React.
- `@types/react`: TypeScript type definitions for React library
- `@types/react-dom`: TypeScript type definitions for ReactDOM library
- `eslint`: JavaScript linter for identifying and fixing code inconsistencies.
- `@vitejs/plugin-react`: Vite plugin for seamless integration of React framework in development.
- `eslint-plugin-react-hooks`: ESLint plugin for enforcing rules of React Hooks.
- `eslint-plugin-react-refresh`: ESLint plugin for compatibility with React Fast Refresh.
- `vite`: Next-generation frontend build tool for efficient development and production workflows.

## Installation

On Command Prompt run the following commands

```sh
# frontend
$ git clone https://github.com/Niyati2601/time-track.git
$ cd time-track/frontend
$ npm install
$ npm start
```

```sh
# backend
$ git clone https://github.com/Niyati2601/time-track.git
$ cd time-track/backend
$ npm install
$ nodemon  or  node index.js
```

### npm start

Runs the app in local mode. Open http://localhost:3000/ to view it in the browser.

By default, for build generate and deploy on server then.

### nodemon 

it restart the server automatically if any changes is done


### node index.js

 it helps to run server but restart needed if any changes is done

### Developed By

Niyati Shah and Namrata Chauhan
