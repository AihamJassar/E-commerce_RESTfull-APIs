# E-Commerce RESTful APIs

> An Express and MongoDB REST API for e-commerce resources, with authentication, users, brands, categories, subcategories, products, image uploads, validation, query features, rate limiting, email support, and Postman collections.

## Overview

This repository contains the source and supporting files for **E-Commerce RESTful APIs**. The documentation below was prepared from the current repository structure and implementation files so that setup expectations, project boundaries, and implemented capabilities are explicit.

## Technology

| Area | Implementation |
| --- | --- |
| Runtime | Node.js with Express 5 |
| Data | MongoDB with Mongoose |
| Security | JWT, Mongo sanitization, HPP, validation, and rate limiting |
| Media | Multer and Sharp |
| Documentation | Postman collection included |

## Key capabilities

| Area | Current implementation |
| --- | --- |
| Commerce resources | Implements CRUD-oriented resources for products, brands, categories, subcategories, and users. |
| Account security | Includes auth routes, validation, token generation, and protective middleware. |
| Developer onboarding | Provides a Postman collection for exercising API endpoints. |

## Getting started

Use the following workflow to work with the project locally.

```bash
git clone https://github.com/aihamjassar/E-commerce_RESTfull-APIs.git
cd E-commerce_RESTfull-APIs
npm install
# Configure MongoDB, JWT, email, and upload environment values
npm run start:dev
```

## Project structure

| Path | Purpose |
| --- | --- |
| controllers/ | Resource-specific handlers and shared controller factory |
| models/ | User, product, category, subcategory, and brand models |
| routers/ | REST route groups |
| middlewares/ | Error, validation, and upload middleware |
| utils/ | Errors, API query features, token, email, and sanitization helpers |
| Postman Collections/ | Importable API collection |

## Configuration notes

Configure MongoDB, email transport, JWT, upload, and production-origin settings with environment variables. Review validation, authorization, file-size, and security policies before exposing the API publicly.

## License

No license file is currently included. Confirm the intended licensing terms with the repository owner before reuse or distribution.

## Maintainer

Maintained by [Aiham Jassar](https://github.com/aihamjassar). Contributions, issue reports, and improvement suggestions are welcome through the repository.
