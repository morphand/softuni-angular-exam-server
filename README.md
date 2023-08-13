# API Endpoints

| Method | Endpoint     | Requires JWT | Requires request body | Required request body parameters                                              |
| ------ | ------------ | ------------ | --------------------- | ----------------------------------------------------------------------------- |
| POST   | /login       | No           | Yes                   | { username: String, password: String }                                        |
| POST   | /register    | No           | Yes                   | { username: String, password: String, repeatPassword: String, email: String } |
| POST   | /logout      | Yes          | No                    |
| GET    | /catalog     | No           | No                    |
| GET    | /catalog/:id | No           | No                    |
| POST   | /rent        | Yes          | Yes                   | { carId: String }                                                             |
| GET    | /rent        | Yes          | No                    |

The JWT is sent via the "Authentication" header. The cars.json file is provided for initial population of the database.

## Usage

1. Start the server by typing "npm run start".
1. Import the initial cars file (cars.json) into MongoDB (using MongoDB Compass etc.)
