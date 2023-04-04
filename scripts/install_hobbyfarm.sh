#!/bin/bash

echo "Adding entries in /etc/hosts file"
sudo echo "127.0.0.1 admin.hf.local api.hf.local shell.hf.local learn.hf.local" | sudo tee -a /etc/hosts

echo "Installing cert-manager in local k3d cluster"
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.10.1/cert-manager.crds.yaml
helm repo add jetstack https://charts.jetstack.io
helm install cert-manager jetstack/cert-manager --create-namespace --version v1.10.1 --namespace cert-manager
kubectl rollout status deployment cert-manager -n cert-manager

echo "Creating self-signed cluster certificate issuer"
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-cluster-issuer
spec:
  selfSigned: {}
EOF

echo "Installing hobbyfarm in local k3d cluster"
helm repo add hobbyfarm https://hobbyfarm.github.io/hobbyfarm
helm install hobbyfarm hobbyfarm/hobbyfarm --create-namespace \
  --set hobbyfarm.ingress.annotations.'cert-manager\.io/cluster-issuer'=selfsigned-cluster-issuer \
  --set ingress.enabled=true \
  --set ingress.tls.enabled=true \
  --set ingress.tls.secrets.admin=hf-admin-tls \
  --set ingress.tls.secrets.backend=hf-backend-tls \
  --set ingress.tls.secrets.shell=hf-shell-tls \
  --set ingress.tls.secrets.ui=hf-ui-tls \
  --set ingress.hostnames.admin=admin.hf.local \
  --set ingress.hostnames.backend=api.hf.local \
  --set ingress.hostnames.shell=shell.hf.local \
  --set ingress.hostnames.ui=learn.hf.local \
  --set terraform.enabled=false \
  --namespace hobbyfarm-ci
kubectl rollout status deployment gargantua -n hobbyfarm-ci
# mandatory hack so the user can be created without error
sleep 30
helm upgrade --reuse-values hobbyfarm hobbyfarm/hobbyfarm \
  --set users.admin.enabled=true \
  --set users.admin.password=$HOBBYFARM_ADMIN_UI_HASHPWD \
  --namespace hobbyfarm-ci
kubectl rollout status deployment gargantua -n hobbyfarm-ci

echo "Checking Admin UI"
curl -o /dev/null -k -s -w "%{http_code}\n" https://admin.hf.local

echo "Checking UI"
curl -o /dev/null -k -s -w "%{http_code}\n" https://learn.hf.local
