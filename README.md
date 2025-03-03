# Data Display Application

## Introduction
This application is a full-stack solution that demonstrates modern web development practices by implementing a data visualization system. It features a Spring Boot backend that securely fetches and processes data from a remote API, and a React frontend that presents this data in an interactive table format.

### Key Features
- **Secure API Access**: JWT-based authentication for all API requests
- **Real-time Filtering**: Client-side filtering with debounced search to prevent excessive API calls
- **Responsive Design**: Custom-built UI components without relying on UI frameworks
- **Pagination**: Server-side pagination for efficient data handling
- **Code Quality**: Integrated with Checkstyle for code quality and JaCoCo for test coverage
- **Modern Stack**: Spring Boot 3.x for backend and React for frontend
- **Containerization**: Dockerized application with Jib for easy deployment
- **Cloud Native**: Built with Cloud Native principles for Kubernetes deployment


## Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Gradle 7.x or higher

## Project Structure 

## Building and Running the Application

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the application:
```bash
./gradlew build
```

3. Run the application:
```bash
./gradlew bootRun
```

The backend will start on `http://localhost:8080`

### API Documentation
The API documentation is available at `http://localhost:8080/swagger-ui/index.html`

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build the application:
for development:
```bash
npm run build:dev
```
for production:
```bash
npm run build
```
5. Run the application:
```bash
python -m http.server --bind localhost --directory dist 3000
```
The frontend will be available at `http://localhost:3000`

## Development

### Backend Development
- The backend uses Spring Boot 3.x with Java 17
- Code quality is enforced using Checkstyle
- Test coverage is tracked using JaCoCo
- To view the test coverage report:
  ```bash
  ./gradlew test jacocoTestReport
  ```
  The report will be available at `backend/build/reports/jacoco/test/html/index.html`

### Frontend Development
- The frontend is built with React using modern hooks and practices
- Custom CSS is used for styling without external UI frameworks
- Debouncing is implemented for search functionality to optimize performance
- To build for production:
  ```bash
  npm run build
  ```

## API Endpoints

### Data Endpoint
```
GET /api/tasks
```
Parameters:
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 10)
- `name` (optional): Filter by name
- `status` (optional): Filter by status

Response:
```json
{
  "content": [
    {
      "id": 6690,
      "status": "COMPLETED",
      "createdOn": 1543325977000,
      "name": "gallant_chandrasekhar",
      "description": "Example description",
      "delta": 1770
    }
  ],
  "totalPages": 10,
  "totalElements": 100
}
```

## Security
- All API endpoints (except /api/auth) require JWT authentication
- Tokens should be included in the Authorization header as Bearer tokens
- CORS is configured to allow requests from the frontend application

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details 