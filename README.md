# News Aggregator Application Docker Setup
This repository contains the Docker Compose configuration to set up the News Aggregator application using Docker.

## Prerequisites

Before you start, ensure that you have the following installed on your machine:

1. Docker: Make sure you have Docker installed. You can find installation instructions for your operating system [here](https://docs.docker.com/get-docker/).
2.  Docker Compose: Make sure you have Docker Compose installed. You can find installation instructions [here](https://docs.docker.com/compose/install/).

### Getting Started

To get started with the News Aggregator application, follow the steps below:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/juby-gif/NewsApp
```

2. Navigate to the project directory:

```bash
cd NewsApp
```

3. Build and start the Docker containers:

```bash
docker-compose up -d
```
This command will build the necessary Docker images and start the containers in detached mode.

4. Wait for the containers to build and start. This may take a few moments. Once the containers are up and running, you can access the application using the following URLs:

- Frontend:[ http://localhost:3000]( http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

The frontend application should be accessible in your web browser at [ http://localhost:3000]( http://localhost:3000), and the backend API should be available at [http://localhost:8000](http://localhost:8000).

5. To stop the containers and remove the Docker network and volumes, run the following command:

```bash
docker-compose down -v
```
This command will gracefully stop the running containers and remove any associated volumes and networks.

### Configuration
The Docker Compose file docker-compose.yml contains the configuration for the application services. You can modify the following environment variables in the news_aggregator_backend service section to customize the database connection:

- DB_HOST: The hostname of the database service. By default, it is set to db, which corresponds to the MySQL container in the db service.
- DB_DATABASE: The name of the database to use. By default, it is set to news_aggregator.
- DB_USERNAME: The username for the database connection. By default, it is set to root.
- DB_PASSWORD: The password for the database connection. By default, it is set to root.

Make sure to update these variables according to your specific requirements.
