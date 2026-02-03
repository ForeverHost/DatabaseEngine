# DatabaseEngine

A compiled Node.js module for managing databases through `clpctl` commands. This module provides a simple interface for creating, exporting, importing, and deleting databases for GDPS (Geometry Dash Private Server) installations.


## Installation

### 1. Install bytenode

```bash
npm install bytenode
```

> [!WARNING]
> You must have 'sudo' rights on the current user!

2. Create TypeScript declarations

Create a file types/bytenode.d.ts with the following content:

```typescript
declare module "*.jsc" {
    const content: any;
    export default content;
}
```

3. Update tsconfig.json

Add the type declarations to your TypeScript configuration:

```json
{
    "compilerOptions": {
        "typeRoots": ["./types", "./node_modules/@types"],
        "types": ["node", "bytenode"]
    }
}
```

4. Add the module

Place DatabaseEngine-1.0.0.jsc in your project directory or download it from the Releases section.

Usage

Import the module and use its static methods:

```typescript
import "bytenode";
import DatabaseEngine from "./DatabaseEngine-1.0.0.jsc";

// Example usage
async function setupDatabase() {
    // Create a new database
    const [success, password] = await DatabaseEngine.create("n01", "1234");
    
    if (success) {
        console.log(`Database created successfully! Password: ${password}`);
        
        // Export database
        const exportSuccess = await DatabaseEngine.exportDatabase("1234", "/path/to/backup.sql");
        
        // Import database
        const importSuccess = await DatabaseEngine.importDatabase("1234", "/path/to/restore.sql");
        
        // Delete database (when needed)
        // const deleteSuccess = await DatabaseEngine.deleteDatabase("1234");
    }
}
```

API Reference

DatabaseEngine.create(node: string, gdpsid: string): Promise<[boolean, string]>

Creates a new database with the specified parameters.

Parameters:

· node: Sub-domain part (e.g., "n01" for "n01.forever-host.xyz")
· gdpsid: Unique identifier used for database name and username

Returns: A promise that resolves to a tuple:

· First element: true if successful, false otherwise
· Second element: Generated password on success, empty string on failure

Example:

```typescript
const [success, password] = await DatabaseEngine.create("n01", "1234");
```

DatabaseEngine.exportDatabase(gdpsid: string, path: string): Promise<boolean>

Exports a database to a SQL dump file.

Parameters:

· gdpsid: Identifier used for database name
· path: Absolute path where the dump should be written

Returns: true if successful, false otherwise

Example:

```typescript
const success = await DatabaseEngine.exportDatabase("1234", "/backups/gdps-backup.sql");
```

DatabaseEngine.importDatabase(gdpsid: string, path: string): Promise<boolean>

Imports a database from a SQL dump file.

Parameters:

· gdpsid: Identifier used for database name
· path: Absolute path to the dump file to import

Returns: true if successful, false otherwise

Example:

```typescript
const success = await DatabaseEngine.importDatabase("1234", "/backups/gdps-backup.sql");
```

DatabaseEngine.deleteDatabase(gdpsid: string): Promise<boolean>

Deletes a database.

Parameters:

· gdpsid: Identifier used for database name

Returns: true if successful, false otherwise

Example:

```typescript
const success = await DatabaseEngine.deleteDatabase("1234");
```

Naming Convention

The module uses the following naming patterns:

· Database name: gdps-{gdpsid}
· Database user: gdps-{gdpsid}
· Domain: {node}.forever-host.xyz

Dependencies

· Node.js: Required runtime
· bytenode: Required for loading compiled .jsc files
· clpctl: Must be available on the system with sudo privileges
· sudo: Required for executing clpctl commands

Building from Source

If you have the source TypeScript files, you can compile them using:

1. Install dependencies:

```bash
npm install
```

1. Build the project:

```bash
npm run build
```

The compiled file will be available at build/DatabaseEngine.jsc.

Error Handling

All methods return boolean success indicators and log errors to the console. The module uses try...catch blocks internally and will return false when operations fail.

Security Notes

1. The module generates random 10-character passwords for new databases
2. All database operations require sudo privileges
3. Database credentials should be stored securely
4. The deleteDatabase method automatically confirms deletion (includes echo "yes")

License: MIT
