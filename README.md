# SQL Query Hub - Frontend

A modern Vue.js frontend application for executing SQL queries with a beautiful and intuitive user interface. Built with Vue 3, Vuetify, and Vite for optimal performance and developer experience.

## Features

- **Modern UI**: Clean and intuitive interface built with Vuetify 3
- **Multi-Query Support**: Execute multiple SQL queries simultaneously
- **Dynamic Query Management**: Add or remove queries dynamically
- **Real-time Feedback**: Visual feedback for query execution status
- **Database Configuration**: Easy-to-use database connection setup
- **Results Download**: Download query results in ZIP format
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Clear error messages and user feedback

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sql-query-hub-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3000
```

## Project Structure

```
sql-query-hub-frontend/
├── src/
│   ├── components/
│   │   ├── DatabaseConfig.vue    # Database configuration component
│   │   └── SqlQueryExecutor.vue  # Main query execution component
│   ├── services/
│   │   └── api.js               # API service configuration
│   ├── App.vue                  # Root component
│   └── main.js                  # Application entry point
├── public/                      # Static assets
├── index.html                   # HTML entry point
├── vite.config.js              # Vite configuration
└── package.json                 # Project dependencies
```

## Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Component Documentation

### DatabaseConfig Component
- Handles database connection configuration
- Supports MySQL, PostgreSQL, and MSSQL
- Validates connection parameters
- Provides connection status feedback

### SqlQueryExecutor Component
- Manages multiple SQL queries
- Provides query execution controls
- Displays execution results
- Handles file downloads
- Shows execution status and errors

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |

## Features in Detail

### Query Management
- Add unlimited number of queries
- Remove individual queries
- Clear visual separation between queries
- Query numbering for easy reference

### Database Configuration
- Support for multiple database types
- Secure password handling
- Connection parameter validation
- Connection testing capability

### Results Handling
- Automatic download of query results
- ZIP file containing all query outputs
- CSV format for easy data analysis
- Execution logs included

### Error Handling
- Clear error messages
- Visual error indicators
- Connection validation
- Query syntax validation

## Styling

The application uses Vuetify 3 with custom styling enhancements:
- Modern and clean UI
- Responsive design
- Consistent color scheme
- Intuitive icons and buttons
- Smooth animations and transitions

## Browser Support

Tested and supported in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
