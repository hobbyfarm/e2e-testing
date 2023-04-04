#!/bin/bash

k3d cluster create k3d-local --api-port 6560 -p "80:80@loadbalancer" -p "443:443@loadbalancer" --agents 2

docker ps

docker network inspect k3d-k3d-local

kubectl cluster-info
