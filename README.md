# function-five

> Functions created with the following commands:

```
./func create -l node -t http one
./func create -l node -t http two
./func create -l node -t http three
./func create -l node -t http four
./func create -l node -t http five
```

Run in `dev JS` mode

```
./dev-js.sh
```

Run func local

> With this commands bellow, func will start to selecting random ports, and that means we need to change the code after the second step.

```
./func run build --path one/ --registry quay.io/hfrota
./func run build --path two/ --registry quay.io/hfrota
./func run build --path three/ --registry quay.io/hfrota
./func run build --path four/ --registry quay.io/hfrota
./func run build --path five/ --registry quay.io/hfrota
```

Maybe it will make more sense to have a workflow between `dev JS` mode and `deploy` mode, since in `deploy`
https://knative.dev/docs/getting-started/build-run-deploy-func/#procedure_1
 
 ?? 
