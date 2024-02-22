# NY KEA App

This repository contains the code for the NY KEA website, which is divided into two main parts: the backend API, managed by Strapi, and the cross-platform frontend application, built with Expo and React Native for Web.

## Directory Structure

- `frontend/`: Contains the React Native codebase that is used to build the web, iOS, and Android applications using Expo and React Native for Web.
- `backend/`: Contains the Strapi project, which serves as the backend API and content management system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- Yarn ([note on package manager](#note-on-package-manager))
- Git

### Setting Up the Backend

Navigate to the `backend/` directory:

```bash
cd backend
```

Install the necessary dependencies:

```bash
yarn install
```

**If not already present, create a copy of the .env.example file and name it .env.**

Start the Strapi development server:

```bash
yarn develop
```

Your Strapi admin panel should now be available at `http://localhost:1337/admin``.

### Setting Up the Frontend

Navigate to the `frontend/` directory:

```bash
cd frontend
```

Install the dependencies:

```bash
yarn install
```

Start the Expo development server:

```bash
yarn start
```

You can now run the app on iOS, Android, or web from the Expo developer tools that open in the browser.

### Deployment

WIP

## Note on Package Manager

This project uses Yarn as its package manager to ensure consistent installation of dependencies and compatibility with the `yarn.lock` file in the repository. The `yarn.lock` file locks the versions of the project's dependencies, which helps to avoid discrepancies between different development and production environments. For this reason, contributors are encouraged to use Yarn for installing, updating, and managing the project's dependencies.

If you do not have Yarn installed on your system, you can follow the instructions on the [Yarn Installation Page](https://classic.yarnpkg.com/en/docs/install/).

## Testing

Testing is an integral part of our development process to ensure the quality and reliability of our code. In this project, we use different testing strategies for the backend and the frontend.

### Backend Testing

For the backend, we use Jest as our testing framework.

**Running Tests:**

To run the backend tests, navigate to the `backend/` directory and run the following command:

```bash
yarn test
```

This will execute all the tests located in the `tests/` folder.

**Writing Tests:**

Tests should be written in the `tests/` directory and structured to reflect the directory structure of the code being tested. Test files should be named in the format `[filename].test.js`.

Please ensure that any new backend features include corresponding unit tests and that you update existing tests as necessary.

### Frontend Testing

The frontend testing is setup with Jest for unit tests and React Native Testing Library for component tests.

**Running Tests:**

To run the frontend tests, navigate to the `frontend/` directory and run:

```bash
yarn test
```

This command will run all the test suites defined in the project.

**Writing Tests:**

Frontend tests should be placed in a `__tests__` directory within the relevant feature or component folder. Test files should be named in the format `[ComponentName].test.js`.

Make sure to write tests for any new components or utility functions, and update tests after making changes to the corresponding parts of the codebase.
