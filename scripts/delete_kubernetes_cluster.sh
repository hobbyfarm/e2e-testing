#!/bin/bash

# helm uninstall hobbyfarm -n hobbyfarm-ci 2>&1
k3d cluster stop k3d-local
k3d cluster delete k3d-local
