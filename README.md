<img src="apps/client/public/logo.png" alt="Logo" width="400"/>

# User Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Setup](#setup)
3. [Project Structure](#project-structure)
4. [Usage](#usage)
5. [Contributing](#contributing)

## Introduction

This repository is a monorepo built using npm workspaces and TurboRepo. It is designed to efficiently manage multiple projects within a single codebase. The monorepo structure allows for shared dependencies and code between different projects, reducing duplication and ensuring consistency.

The repository is divided into two main sections:

1. **Apps**: This folder contains the runtime applications, including both server and client components. The server is built with Fastify, utilizing Zod for schema validation and Swagger for API documentation. The client is developed using Svelte and is rendered on the client side.

2. **Packages**: This folder includes shared libraries and utilities that are used by both the server and client applications. Examples include Zod schemas and TypeScript types.

Using npm workspaces and TurboRepo, the monorepo setup ensures streamlined dependency management, faster builds, and easier code sharing across different projects within the repository.

## Apps

The `apps` folder contains the main applications of the repository. These applications are divided into server and client components:

By leveraging these technologies and organizing the code in a modular way, the server application is designed to be robust, scalable, and easy to maintain.

1. **Server**: Built with Fastify, the server handles API requests and responses. It uses Zod for schema validation and Swagger for API documentation.
2. **Client**: Developed using Svelte, the client application is responsible for rendering the user interface on the client side.

### Server

The `apps/server` directory contains the backend application of the repository. This server is built using several modern technologies and libraries to ensure high performance, scalability, and maintainability. Below is a detailed explanation of the key technologies used:

1. **Fastify**: Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. It is used to handle HTTP requests and responses efficiently.

2. **Zod**: Zod is a TypeScript-first schema declaration and validation library. It is used in the server to define and validate the shape of data, ensuring that the incoming requests meet the expected structure.

3. **Swagger**: Swagger is used for API documentation. It provides a user-friendly interface to explore and test the API endpoints, making it easier for developers to understand and interact with the backend services.

4. **PostgreSQL**: PostgreSQL is the primary database used in the server. It is a powerful, open-source object-relational database system that provides robust data integrity and supports advanced data types and performance optimization features.

5. **Prisma**: Prisma is an ORM (Object-Relational Mapping) tool that simplifies database access and management. It provides a type-safe database client, making it easier to interact with PostgreSQL and ensuring type safety throughout the database operations.

6. **TypeScript**: TypeScript is used throughout the server codebase to provide static type checking, which helps catch errors early in the development process and improves code quality and maintainability.

### Server Structure

The server application is organized into several key components:

- **Routes**: This folder contains the route definitions for the API endpoints. Each route is associated with a specific controller that handles the business logic for that endpoint.
- **Controllers**: Controllers are responsible for processing incoming requests, interacting with the services, and returning the appropriate responses.
- **Services**: Services contain the core business logic of the application. They interact with the database and other external services to perform the necessary operations.
- **Clients**: Clients contain the creation of different clients, for example, `Prisma`.

### Client

The `apps/client` directory contains the frontend application of the repository. This client is built using modern web technologies to ensure a responsive and dynamic user experience. Below is a detailed explanation of the key technologies used:

1. **Svelte**: Svelte is a modern JavaScript framework for building user interfaces. It shifts much of the work to compile time, resulting in highly efficient and fast applications. Svelte is used to create reactive and interactive UI components.

2. **Vite**: Vite is a build tool that provides a fast and lean development experience for modern web projects. It is used to bundle the client application, offering instant server start, lightning-fast hot module replacement (HMR), and optimized builds.

3. **TypeScript**: TypeScript is used throughout the client codebase to provide static type checking, which helps catch errors early in the development process and improves code quality and maintainability.

## Packages

The `packages` folder includes shared libraries and utilities that are used by both the server and client applications. These packages help in maintaining consistency and reducing code duplication across the repository. Examples include:

1. **Zod Schemas**: Shared schema definitions for data validation.
2. **TypeScript Types**: Common TypeScript types used throughout the repository.

## Setup

The backend in this project heavily relies on `PostgreSQL`. Please refer to the following steps to start `PostgreSQL` for this application:

1. **Ensure Docker and Docker Compose are installed on your machine.**

2. **Start the Docker containers:**

   ```sh
   docker-compose up -d
   ```

3. **Verify that the PostgreSQL container is running:**

   ```sh
   docker ps
   ```

4. **To stop the Docker containers, run:**
   ```sh
   docker-compose down
   ```

By following these steps, you will have a PostgreSQL database running in a Docker container, ready to be used by your applications.

I recommend using [Lazydocker](https://github.com/jesseduffield/lazydocker) to manage all Docker images from the terminal.

To install dependencies, run `npm install` in the root directory. TurboRepo takes care of monorepo installs.

## Usage

To run a project, use the following commands:

1. **Install packages:**

   ```sh
   npm install
   ```

2. **Build .env file:**

   ```sh
   touch ./apps/server/.env
   echo 'DATABASE_URL="postgresql://panteautomaten:shhh@localhost:5432/panteautomaten_db?schema=public"' >> ./apps/server/.env

   ```

3. **Generate prisma client:**

   ```sh
   npm run prisma:generate
   ```

4. **Run migrations:**

   ```sh
   npm run prisma:migrate
   ```

5. **Build:**

   ```sh
   npm run build
   ```

6. **Start the project:**
   ```sh
   npm run dev
   ```
7. **Run tests:**
   ```sh
   npm run test
   ```

Go to [Frontend](http://localhost:5173/) to see the frontend. The `/` is a home page, and `/admin` is admin page to see all the collections made in the system.

Go to [API documentation](http://localhost:3000/documentation) to see API documentation and test API routes.

## Contributing

To contribute to any project here, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

### Definition of Done (DoD)

> RS-001
> As a drinks' manufacturer,
> I'd like the system to accept empty bottles
> So that we can reacquire used bottles for recycling.

Clicking on a big bottle, accepts empty bottle.

> RS-002
> As a drinks' manufacturer,
> I'd like the system to accept empty cans,
> So that we can reacquire used cans for recycling.

Clicking on a small bottle, accepts empty can. (Small bottle instead of the can due to the lack of image resources)

> RS-003
> As a customer,
> I'd like the system to give me a voucher as a reward for turning in bottles,
> So that I can buy stuff

You get the voucher after clicking "Ferdig". After you click on "Utløs", you get a pleasant surprise.

> RS-004
> As a drinks' manufacturer,
> I'd like a backend system to log whenever a bottle/can is turned in or a voucher is printed,
> So that we can report the efficiency of each recycling station.

Instead of logging, there is an entire `Admin` page, continaint every "purchase".

## Acknowledgments

- [TurboRepo](https://turborepo.org/)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Fastify](https://www.fastify.io/)
- [Svelte](https://svelte.dev/)
- [Zod](https://github.com/colinhacks/zod)
- [Swagger](https://swagger.io/)
