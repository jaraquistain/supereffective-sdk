#!/bin/bash

set -e

# Load .env file
if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
else
  echo "No .env file found"
  exit 1
fi

# Check if env file is parsed correctly
if [ -z "$PORT" ]; then
  echo "PORT is not set"
  exit 1
fi

DEV_PORT=${PORT:-30090}

startNextServer() {
  PORT=$DEV_PORT next dev
}

# execute startNextServer function in subshell
startNextServer &

# get pid of last executed command (startNextServer)
SERVER_PID=$!

# trap ctrl-c and call ctrl_c() function to kill all child processes if you press ctrl-c
trap ctrl_c INT

function ctrl_c() {
  echo "** Trapped CTRL-C"
  kill -9 $SERVER_PID
  exit 1
}

# wait until server is up and then open it in the browser
echo "Waiting for server to start on port $DEV_PORT"
until $(curl --output /dev/null --silent --head --fail "http://localhost:$DEV_PORT"); do
    printf '.'
    sleep 1
done
echo ""

open "http://localhost:$DEV_PORT"
