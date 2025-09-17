# Guno-Hub

## Pull code
```shell
git pull git@github.com:ninhgio/Guno-Hub.git
```

## Build Image
```shell
docker build ./ --no-cache -t "hub-guno-store:latest"
```

# Clear docker image & volumes not using
```shell
docker system prune -a -f --volumes
```
