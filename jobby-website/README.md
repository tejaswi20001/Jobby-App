# Jobby App 💼

Jobby App is a React-based job search platform that allows users to authenticate, search for jobs using multiple filters, and view detailed job information through protected routes with a clean and responsive UI.

---

## 🌐 Live Demo Link

- Live Site: https://jobby-application-self.vercel.app/login
- GitHub Repo: https://github.com/tejaswi20001/Jobby-App.git

### ## 🔑 Test Credentials

Use these credentials to log in:

Username: rahul
Password: rahul@2021

## 🚀 Features

### 🔐 Authentication (Login Route)

- User login with JWT-based authentication
- Displays error message for invalid credentials
- Redirects authenticated users away from the Login page
- Redirects unauthenticated users to Login when accessing protected routes
- Logout clears authentication and redirects to Login

---

### Added images in assets/

### 🏠 Home Page

- Accessible only to authenticated users
- “Find Jobs” button navigates to the Jobs page

---

### 💼 Jobs Page

- Fetches and displays user profile details
- Displays loader while fetching profile data
- Displays failure view with retry option on API failure
- Fetches jobs list with the following query parameters:
  - `employment_type`
  - `minimum_package`
  - `search`
- Displays loader while fetching jobs data
- Supports the following filters:
  - Search by job title
  - Employment type (Full Time, Part Time, etc.)
  - Salary range
- Supports **multiple filters applied together**
- Displays:
  - Jobs list on success
  - No Jobs Found view when results are empty
  - Failure view with retry option on API failure
- Navigates to Job Details page when a job card is clicked

### Job Details Page

- Fetches job details using job ID from the API
- Displays: Job description, Skills required, Life at company section, List of similar jobs, Shows loader while fetching jobdetails, Displays failure view with retry option on API failure, and “Visit” button opens the company website in a new tab.

**Example API request with multiple filters applied:**

```js
https://apis.ccbp.in/jobs

Folder Structure

src/
 ├─ components/
 │   ├─ Login/
 │   ├─ Home/
 │   ├─ Jobs/
 │   ├─ JobItemDetails/
 │   ├─ Header/
 │   └─ NotFound/
 ├─ App.js
 ├─ index.js
 └─ index.css
public/
 ├─ index.html
 └─ favicon.ico

```
