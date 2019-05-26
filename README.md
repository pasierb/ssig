# Ssig

Ssig is an image automation SaaS.

## Development

### Prerequisites

* [docker](https://docs.docker.com/install/)
* [docker-compose](https://docs.docker.com/compose/install/)
* [lerna](https://github.com/lerna/lerna)
* nodejs@10.15.3

### Running dev environemnt

Run database container

```bash
docker-compose up -d
```

Initiate database
```
lerna run db:create
lerna run db:migrate
```

Run app
```
lerna bootstrap
lerna run dev --stream
```