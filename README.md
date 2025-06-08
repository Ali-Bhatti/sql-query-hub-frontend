# SQL Query Hub - Frontend

A modern Vue.js application for executing SQL queries across multiple databases with a beautiful and intuitive user interface.

## 🌐 Live Demo
The application is deployed and accessible at: [SQL Query Hub](https://sql-query-hub.netlify.app)

## ✨ Features

- **Multi-Database Support**: Execute queries on MySQL, PostgreSQL, and MSSQL databases
- **Batch Query Execution**: Run multiple SQL queries simultaneously
- **Query Results Export**: Automatically exports results to downloadable files
- **Modern UI/UX**: Clean and intuitive interface built with Vuetify 3
- **Real-time Validation**: Immediate feedback on configuration and query inputs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- Vue.js 3
- Vuetify 3
- Vite
- Node.js
- Netlify (Hosting)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ali-Bhatti/sql-query-hub-frontend.git
cd sql-query-hub-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3000  # For local development
```

4. Run the development server:
```bash
npm run dev
```

## 📦 Building for Production

```bash
npm run build
```

## 🌍 Deployment

The application is deployed on Netlify. For deploying your own instance:

1. Fork this repository
2. Sign up on [Netlify](https://www.netlify.com)
3. Create a new site from Git
4. Connect your forked repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Netlify dashboard:
   - `VITE_API_URL`: Your backend API URL

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |

## 📱 Features in Detail

### Database Configuration
- Support for multiple database types
- Secure password handling
- Connection parameter validation
- Connection testing capability
- Config file upload/download

### Query Management
- Multiple query support
- Query validation
- Real-time error feedback
- Auto-dismissing notifications

### Results Handling
- Automatic download of query results
- ZIP file containing all query outputs
- CSV format for easy data analysis
- Execution logs included

## 🎨 UI/UX Features

- Modern and clean interface
- Responsive design
- Consistent color scheme
- Intuitive icons and buttons
- Smooth animations and transitions
- Error handling with visual feedback

## 🌐 Browser Support

Tested and supported in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

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

