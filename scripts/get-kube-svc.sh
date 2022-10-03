#!/bin/sh
IP=$(kubectl get svc britevue-web -n bv-web-dev -o json | jq .status.loadBalancer.ingress[0].ip | sed -e 's/^"//' -e 's/"$//')
counter=0
until [ $counter -gt 50 ]
do
  if [[ $IP =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    break
  else
    echo "waiting for elb to come up..."
    sleep 5
    IP=$(kubectl get svc britevue-web -n bv-web-dev -o json | jq .status.loadBalancer.ingress[0].ip | sed -e 's/^"//' -e 's/"$//')
    ((counter++))
  fi
done
if [[ $IP =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo $IP
else
  exit 1
fi
