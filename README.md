# 💰 Finance Tracker

A full-stack personal finance management application built with **Spring Boot** and **React**.

Finance Tracker allows users to manage their personal finances through transactions, categories, budgets, dashboards, and financial insights. The application combines a RESTful Spring Boot backend with a modern React frontend focused on a clean and responsive user experience.

---

## ✨ Features

### 🔐 Authentication & User Management

* User registration and login
* JWT-based authentication
* Secure password hashing with BCrypt
* Protected API endpoints
* User profile management
* Account information and registration date

### 💳 Transaction Management

* Create, edit, and delete transactions
* Income and expense tracking
* Transaction categories
* Transaction dates and descriptions
* Filtering by category and transaction type
* Sorting by:

  * Newest
  * Oldest
  * Highest amount
  * Lowest amount
  * A–Z
  * Z–A
* Pagination
* Empty and loading states

### 🏷️ Category Management

* Create custom categories
* Edit categories
* Delete categories
* Category colors
* Category-based spending analysis

### 💰 Budget Management

* Create and manage budgets
* Track spending against budget limits
* Budget progress indicators
* Visual budget status
* Spending limits by category

### 📊 Dashboard

The dashboard provides an overview of the user's current financial situation.

* Total income
* Total expenses
* Current balance
* Spending by category
* Income vs. expenses
* Recent transactions
* Monthly budget progress
* Spending insights

### 📈 Financial Insights

* Monthly spending trends
* Top spending categories
* Financial recommendations
* Data-driven spending summaries
* Interactive charts and visualizations

### ⚙️ Settings

* User profile management
* Account preferences
* Notification settings
* Security settings
* Account management

---

## 🛠️ Tech Stack

### Backend

* **Java 21**
* **Spring Boot**
* **Spring Security**
* **JWT**
* **Spring Data JPA**
* **Hibernate**
* **MySQL**
* **MapStruct**
* **Lombok**
* **Springdoc OpenAPI / Swagger**

### Frontend

* **React**
* **Vite**
* **JavaScript**
* **Tailwind CSS**
* **React Router**
* **Recharts**
* **React Icons**
* **React Hot Toast**

---

## 🏗️ Architecture

The application is divided into two main parts:

```text
Finance Tracker
│
├── finance_tracker_backend
│   ├── configuration
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── enums
│   ├── exception
│   ├── filter
│   ├── mapper
│   ├── projection
│   ├── repository
│   ├── security
│   └── service
│
└── finance_tracker_frontend
    ├── api
    ├── components
    ├── constants
    ├── context
    ├── data
    ├── hooks
    ├── pages
    ├── routes
    └── utils
```

### Backend

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

DTOs and MapStruct are used to separate API models from persistence entities.

Authentication is handled through Spring Security and JWT.

### Frontend

The React application is organized around reusable components and custom hooks.

```text
Pages
  ↓
Reusable Components
  ↓
Custom Hooks
  ↓
API Layer
  ↓
Spring Boot REST API
```

---

## 🗄️ Database

Finance Tracker uses **MySQL** as its relational database.

The main entities are:

```text
User
 │
 ├── Transactions
 │
 ├── Categories
 │
 └── Budgets
```

Transactions are associated with users and categories, while budgets allow users to define spending limits and track their financial activity.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Java 21
* Maven
* Node.js
* npm
* MySQL
* Git

---



## 🔒 Security

The project uses:

* Spring Security
* JWT authentication
* BCrypt password hashing
* Protected REST endpoints
* User-specific data access

Sensitive configuration such as database credentials and JWT secrets is kept outside version control.

---

## 📌 Current Status

The core application functionality is implemented, including:

* [x] Authentication
* [x] User profile
* [x] Dashboard
* [x] Transactions
* [x] Categories
* [x] Budgets
* [x] Financial insights
* [x] Charts and visualizations
* [x] Settings interface

Additional backend settings functionality and further improvements are planned.

---

## 🔮 Future Improvements

Potential future development includes:

* [ ] Complete notification preferences
* [ ] Password change
* [ ] Account deletion
* [ ] Advanced financial reports
* [ ] Implement user preferences (date format, currency, etc.)
* [ ] Export transactions
* [ ] Recurring transactions
* [ ] Improved validation and error handling
* [ ] Automated tests
* [ ] Docker support
* [ ] Production deployment
* [ ] CI/CD pipeline

---

## 👨‍💻 Author

**Mikuláš Machovec**

This project was created as a full-stack development project to practice and demonstrate skills in **Java, Spring Boot, REST APIs, React, database design, authentication, and modern frontend development**.
