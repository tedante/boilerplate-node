#!/bin/sh


echo "Checking Installation Requirements"

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

echo "Installation Requirements met"
echo "Installing boilerplate-node"
git clone git@github.com:tedante/boilerplate-node.git
cd boilerplate-node 

echo "Installing dependencies"
if command -v pnpm >/dev/null; then
  pnpm install
else 
  npm install
fi

echo "Creating .env file"
cp .env.example .env

echo "Installation complete"
