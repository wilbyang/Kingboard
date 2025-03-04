# Data Display Application

## Introduction
This application is a full-stack solution that demonstrates modern web development practices by implementing a data table display system. It features a Spring Boot backend that securely fetches and processes data from a remote API, and a React frontend that presents this data in an interactive table format.

### Backend Features
- **Modern Stack**: Spring Boot 3.x(Jackson, Caffeine, JWT, etc) + Gradle
- **Containerization**: Dockerized application with Jib for easy deployment
- **Secure API Access**: JWT-based authentication for protected API resources
- **CORS**: CORS is configured to allow requests from the frontend application
- **Caching**: Caffeine based caching mechanism for efficient data handling
- **Pagination**: Server-side pagination for efficient data handling
- **Req/Resp Logging**: AOP based request&response logging for better debugging/troubleshooting and monitoring
- **Error Handling**: Unified error handling for all API requests
- **Code Quality Assurance**: Integrated with Checkstyle for code quality and JaCoCo for test coverage
- **Api docs**: Swagger UI for API documentation




### Frontend Key Features
- **Performance Optimization**: Debouncing for search functionality to prevent excessive API calls
- **Independent development for Efficiency**: Independent frontend development with mocks for backend by MSW
- **Code Quality**: Integrated with ESLint for code quality
- **Testing**: Good Integration Tests coverage
- **Responsive Design**: Custom-built UI components without relying on UI frameworks
- **Pagination**: Client-side pagination for efficient data handling
- **Modern Stack**: React + Vite + TypeScript + TailwindCSS


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
2. Run Tests:
```bash
./gradlew test
```
3. Build the application:
```bash
./gradlew build
```

4. Run the application:
```bash
./gradlew bootRun
```
The backend will start on `http://localhost:8080`

5. Build Docker Image:
```bash
./gradlew jibDockerBuild
```
The Docker image will be built and pushed to the local Docker registry.

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

3. Test the application:
```bash
npm run test
```

4. Start the development server:
```bash
npm run dev
```

5. Build the application:
for development:
```bash
npm run build:dev
```
for production:
```bash
npm run build
```
6. Run the application:
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

## Roadmap
- **Fuzzy Search**: Fuzzy search for the data table
- **Unified Response**: Unified response format for all API responses
- **Rate Limiting**: Rate limiting for all API requests
- **Monitoring**: Spring Boot Actuator for monitoring and metrics
- **Test coverage**: 100% test coverage for all API requests



## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details 