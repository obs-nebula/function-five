# function-five

[![ci](https://github.com/obs-nebula/function-five/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/obs-nebula/function-five/actions/workflows/ci.yml)

Run `./get-func.sh` to get the `func` command.

> Functions created with the following commands:

```
./func create -l node -t http one
./func create -l node -t http two
./func create -l node -t http three
./func create -l node -t http four
./func create -l node -t http five
```

## Run in `dev JS` ??? local mode

```
./dev-js.sh
```

## Run local

### Build the functions

```
./func-build.sh
```

### Run 

```
docker-compose up
```
