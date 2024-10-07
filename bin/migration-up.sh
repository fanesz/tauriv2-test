#!/bin/bash

if [ -f "$(dirname $0)/../.env" ]; then
  export $(cat "$(dirname $0)/../.env" | grep -v '#' | xargs)
fi

DATABASE_URL="postgres://${VITE_DB_USER}:${VITE_DB_PASSWORD}@${VITE_DB_HOST}:${VITE_DB_PORT}/${VITE_DB_NAME}?sslmode=disable"
migrate -path ../migrations -database "$DATABASE_URL"  up

echo "Press any key to continue..."
read -r