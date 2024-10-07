## Cashier and Stock Management Desktop App

Run command: `bun run tdev`

## Prerequisites

### Extension

- Tauri
- Rust Analyzer
- Prettier
- Eslint

### Dependencies

Follow [this guide](https://v2.tauri.app/start/prerequisites/) from official site

### Runtime

This project using [Bun](https://bun.sh/) as a project runtime,
run: `npm i -g bun` to install it

### Database

Using postgresql, you can use docker, wsl, or postgres for windows

### Migration

To create a new migration file:
`bun run migration:create newTableName`

To run current migration file:
open `bin/migration-up.sh`