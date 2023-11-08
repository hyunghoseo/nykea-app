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
- Yarn
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
expo start
```

You can now run the app on iOS, Android, or web from the Expo developer tools that open in the browser.

### Deployment

WIP

## Note on Package Manager

This project uses Yarn as its package manager to ensure consistent installation of dependencies and compatibility with the `yarn.lock` file in the repository. The `yarn.lock` file locks the versions of the project's dependencies, which helps to avoid discrepancies between different development and production environments. For this reason, contributors are encouraged to use Yarn for installing, updating, and managing the project's dependencies.

If you do not have Yarn installed on your system, you can follow the instructions on the [Yarn Installation Page](https://classic.yarnpkg.com/en/docs/install/).
