#!/bin/sh

if ! command -v git >/dev/null; then
  echo "Git is not installed on your machine" 

  exit 1
fi

if ! command -v node >/dev/null; then
  echo "Node is not installed on your machine" 

  exit 1
fi

if ! command -v npm >/dev/null; then
  echo "NPM is not installed on your machine" 

  exit 1
fi

git clone git@github.com:tedante/boilerplate-node.git
cd boilerplate-node 

docker compose up -d --build