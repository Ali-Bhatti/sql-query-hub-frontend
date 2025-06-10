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

### Local Installation

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
