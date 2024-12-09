# Search Application

A full-stack search application that uses DuckDuckGo's API to perform searches and display results with advanced features.

## Features

- Search using DuckDuckGo API
- Real-time result highlighting
- Search history tracking
- Pagination support
- Responsive design

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- Axios

### Frontend

- React
- Redux Toolkit
- TypeScript
- Styled Components

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/search-application.git
   cd search-application   ```

2. Install dependencies for the server:

   ```bash
   cd server
   npm install   ```

3. Install dependencies for the client:

   ```bash
   cd ../client
   npm install   ```

### Running the Application

#### Backend (API Server)

1. Start the server in development mode:

   ```bash
   cd server
   npm run dev   ```

   This will start the server using `nodemon` for automatic restarts on file changes.

2. Alternatively, build and start the server:

   ```bash
   npm run build
   npm start   ```

   This will compile TypeScript files and start the server.

#### Frontend (React Application)

1. Start the client application:

   ```bash
   cd client
   npm start   ```

   This will start the React application and open it in your default web browser.

### Usage

- **Search**: Enter a query in the search bar and press enter to perform a search using the DuckDuckGo API.
- **Pagination**: Navigate through search results using pagination controls.
- **Highlighting**: Search terms are highlighted in the results for easy identification.
- **History**: View your search history to quickly access previous queries.

### Testing

- Run tests for the client:

  ```bash
  cd client
  npm test  ```

  This will execute the test suite using Jest.

### Environment Variables

- Create a `.env` file in the `server` directory to configure environment variables:

  ```plaintext
  API_BASE_URL=http://localhost:5000  ```

  Adjust the `API_BASE_URL` as needed for your setup.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
