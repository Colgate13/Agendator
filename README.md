<h1 align="center">Agendator</h1>

<p align="center">
  <a href="#about">Sobre este projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#recursos">Recursoso</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

## :notebook: Sobre este projeto

<div id="about"></div>

Backend Agenda Online, onde é possível marcar criar um usuario, logar nele, criar agendar compromissões e lista-los

## Tecnologias 🐱‍🏍🎂

<div id="tecnologias"></div>

- [Node](http://nodejs.org/) - Nodejs
- [typescript](https://www.typescriptlang.org/) - Super Javascript
- [Jest](https://jestjs.io/) - UnitTest
- [JWT](https://jwt.io/)
- [Eslint](https://eslint.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Prisma](https://www.prisma.io/)

### Recursos

<div id="recursos"></div>

- [x] DDD with Typescript
- [x] SingIn and Login Users
- [x] Create and List Appointments
- [x] Documentation with Swagger
- [x] MultiProcess Aplication
- [x] Auto Deployment in server VPS
- [x] Github CI/CD -> run Test Types, run Test Units, Deployment and Notify using API notification
- [x] Eslint AirBnb
- [x] Full test unit 100% coverage


## Installation and run

```yarn 
git clone https://github.com/Colgate13/Agendator.git
npm ci i
npm run-script test
npm run-script dev

$ > Server is running in 3000!
```

## Deploy and run

```yarn 
git clone https://github.com/Colgate13/Agendator.git
npm install pm2 -g
npm ci i
npm run build
npm run prisma:deploy
pm2 link ${{ secrets.PM2A }} ${{ secrets.PM2B }}
pm2 delete agendator - Server
pm2 start ecosystem.config.js

$ > Server is running in 3000!
```

# Usage
```
curl ip:PORT/docs

curl localhost:3000/docs
```

# /docs
```json
{
  "users": {
    "post": {
      "/users": {
        "description": "Create a new user",
        "body": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "description": "User username"
            },
            "email": {
              "type": "string",
              "description": "User email"
            },
            "password": {
              "type": "string",
              "description": "User password"
            }
          }
        },
        "response": {
          "201": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "User id"
              },
              "username": {
                "type": "string",
                "description": "User username"
              },
              "email": {
                "type": "string",
                "description": "User email"
              },
              "token": {
                "type": "string",
                "description": "User token"
              }
            }
          }
        }
      },
      "/users/auth": {
        "description": "Authenticate a user",
        "body": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User email"
            },
            "password": {
              "type": "string",
              "description": "User password"
            }
          },
          "response": {
            "200": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string",
                  "description": "User message"
                },
                "token": {
                  "type": "string",
                  "description": "User token"
                }
              }
            }
          }
        }
      }
    }
  },
  "appointments": {
    "post": {
      "/appointments": {
        "description": "Create a new appointment",
        "body": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string",
              "description": "Appointment date"
            },
            "price": {
              "type": "number",
              "description": "Appointment price"
            },
            "description": {
              "type": "string",
              "description": "Appointment description"
            }
          }
        },
        "response": {
          "201": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "Appointment id"
              },
              "date": {
                "type": "string",
                "description": "Appointment date"
              },
              "price": {
                "type": "number",
                "description": "Appointment price"
              },
              "description": {
                "type": "string",
                "description": "Appointment description"
              },
              "user_id": {
                "type": "string",
                "description": "Appointment user id"
              }
            }
          }
        }
      }
    },
    "get": {
      "/appointments/list": {
        "description": "List all appointments",
        "response": {
          "200": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Appointment id"
                },
                "date": {
                  "type": "string",
                  "description": "Appointment date"
                },
                "price": {
                  "type": "number",
                  "description": "Appointment price"
                },
                "description": {
                  "type": "string",
                  "description": "Appointment description"
                },
                "user_id": {
                  "type": "string",
                  "description": "Appointment user id"
                }
              }
            }
          }
        }
      }
    }
  }
}
```



## License

<div id="license"></div>

MIT [LICENSE](LICENSE.md)
