
```markdown
# Parkease — Full Stack Smart Parking Platform

Parkease is a full-stack smart parking management system that allows users to find, book, and pay for parking slots in real time, while providing admins with complete control over locations, slots, pricing, maintenance, and analytics.

---

## Features

### User
- Real-time parking map
- Slot availability by location
- Vehicle-type-aware booking (validation enforced)
- Checkout with auto-opening payment modal
- Booking history

### Admin
- Manage parking locations and slots
- Slot states: Available / Occupied / Maintenance
- Maintenance slots are never bookable
- Pricing, promotions, subscriptions
- Reports and analytics
- Audit logs

### Security
- JWT authentication
- Vehicle-type validation during booking

---

## Tech Stack

**Frontend**
- React 18
- Axios

**Backend**
- Spring Boot (Java 17)
- Spring Data JPA
- MongoDB Atlas

---

## Repository Structure

parkease-frontend/        # React frontend
parkease-backend/   # Spring Boot backend


---

## Prerequisites

- Node.js 18+
- Java 17
- Maven 3.9+
- MongoDB Atlas

---

## Backend Setup

Create local properties file:

copy parkease-backend\src\main\resources\application.example.properties Smart-Parking-Backend\src\main\resources\application.properties


Edit `application.properties`:

spring.datasource.url=jdbc:mysql://localhost:3306/parksmart?createDatabaseIfNotExist=true&serverTimezone=UTC
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update

app.jwt.secret=REPLACE_WITH_STRONG_32B_SECRET
app.jwt.expiration-ms=3600000

server.port=8080

Run backend:

cd parkease-backend
mvnw.cmd spring-boot:run
# or
./mvnw spring-boot:run

---

## Frontend Setup

Create `.env.local`:

API_BASE_URL=http://localhost:8080

Run frontend:

cd parkease-frontend
npm install
npm run dev
---

## Demo Credentials

### Admin

* Email: **[admin@parkease.com](mailto:admin@parkease.com)**
* Password: **admin123**

### User

* Email: **[Prasanth@parkease.com](mailto:Prasanth@parkease.com)**
* Password: **mypassword**

---
