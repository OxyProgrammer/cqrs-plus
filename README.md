<div id="top"></div>

<div align="center">
  <a href="https://github.com/OxyProgrammer/cqrs-plus">
    <img src="Images/logo.png" alt="Logo">
  </a>
  <br/>
  <h1 align="center"><u>CQRS Plus</u></h1>

  <p align="center">
    Welcome to CQRSPlus!
    <br/>
    <a href="https://github.com/OxyProgrammer/cqrs-plus/issues">Report Issue</a>
    ·
    <a href="https://github.com/OxyProgrammer/cqrs-plus/issues">Request Feature</a>
  </p>
  </div>

[![GitHub issues](https://img.shields.io/github/issues/OxyProgrammer/cqrs-plus?style=for-the-badge)](https://github.com/OxyProgrammer/cqrs-plus/issues)
[![GitHub forks](https://img.shields.io/github/forks/OxyProgrammer/cqrs-plus?style=for-the-badge)](https://github.com/OxyProgrammer/cqrs-plus/network)
[![GitHub stars](https://img.shields.io/github/stars/OxyProgrammer/cqrs-plus?style=for-the-badge)](https://github.com/OxyProgrammer/cqrs-plus/stargazers)
[![GitHub license](https://img.shields.io/github/license/OxyProgrammer/cqrs-plus?style=for-the-badge)](https://github.com/OxyProgrammer/cqrs-plus)

<!-- ABOUT THE PROJECT -->

## About The Project

This repository contains a comprehensive CQRS implementation for a distributed environment. The code demonstrates a polyglot microservices application that implements Command Query Responsibility Segregation using Event Sourcing.
CQRS Plus uses a variety of technologies.

<p align="right">(<a href="#top">back to top</a>)</p>

## Tech Stack

<br/>
<p align="center">
  <img height='128px' width='128px' src="Images/csharpLogo.png" alt="CSharp Logo" />
  <img height='128px' width='128px' src="Images/kafkaLogo.png" alt="Kafka Logo" />
  <img height='128px' width='128px' src="Images/postgresqlLogo.png" alt="Postgre Logo" />
  <img height='128px' width='128px' src="Images/mongodbLogo.png" alt="MongoDb Logo" />
</p>
<p align="right">(<a href="#top">back to top</a>)</p>

## CQRS With event Sourcing

<p align="center">
  <img src="Images/CQRSFlowDiagram.png" alt="CSharp Logo" />
</p>

#### CQRS
- **What is CQRS?**
  - CQRS separates read (queries) and write (commands) operations, enabling independent scaling and optimization.
  - It recognizes that reading and writing data have different requirements and can benefit from separate implementations.

#### Event Sourcing

- **Understanding Event Sourcing**
  - Event Sourcing captures state changes as a sequence of events over time.
  - Instead of directly modifying state, events representing changes are appended to an event log or store.

#### Combining CQRS with Event Sourcing

- **Why Combine CQRS with Event Sourcing?**
  - CQRS and Event Sourcing are often used together for scalable, maintainable systems.
  - Commands generate events, which are stored in an event log, facilitating a complete history of state changes.

#### Benefits

- **Advantages of CQRS Event Sourcing**
  - Clear separation of read and write operations leads to simpler codebases.
  - Event-driven architectures are enabled, promoting scalability and responsiveness.
  - Auditing and debugging are facilitated through the event log's historical data.

#### Considerations and Challenges

- **Things to Consider**
  - Careful planning is needed for data consistency, eventual consistency, and concurrency.
  - Additional complexity compared to CRUD-based architectures may arise, especially in managing event streams and ensuring consistency.

<p align="right">(<a href="#top">back to top</a>)</p>


## Setup

You will need docker desktop on your machine to be able to run this repo.

Instructions to to published soon.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes.
- Test your changes thoroughly.
- Commit your changes with descriptive commit messages.
- Push your changes to your fork.
- Submit a pull request to the main repository's main branch.
- License
- This project is licensed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgements

- [ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-8.0)
- [Docker Desktop](https://www.docker.com/products/docker-desktop//)
- [Swagger](https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger?view=aspnetcore-8.0)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

If you have any questions, suggestions, or issues, please feel free to contact the project maintainer:

OxyProgrammer - oxyprogrammer@gmail.com

Project Link: [https://github.com/OxyProgrammer/aspnet-plus](https://github.com/OxyProgrammer/aspnet-plus)

<p align="right">(<a href="#top">back to top</a>)</p>