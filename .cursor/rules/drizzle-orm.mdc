---
description: Read this rule when working with Drizzle ORM
globs: 
alwaysApply: false
---

# how to work with drizzle orm (ai rules)

## debugging: `typeerror: cannot read properties of undefined (reading 'referencedtable')`

this error happens when drizzle can't find relationship metadata for a relational query (e.g., `db.query.someTable.findMany({ with: { relatedTable: true } })`).

**checklist:**

1.  **missing `relations` definition:**  
    *   define a `relations` object for the source table (e.g., `userRelations = relations(userTable, ({ many }) => ({ uploads: many(uploadsTable) }))`).  
    *   `.references()` only sets up the db foreign key; it doesn't create drizzle's relation for queries.
2.  **relations not exported:**  
    *   export all `relations` objects from schema files.  
    *   ensure your schema barrel file (e.g., `src/db/schema/index.ts`) exports all tables and relations.
3.  **wrong schema passed to drizzle:**  
    *   when initializing, pass a schema object with both tables and relations:  
        `import * as schema from './schema';`  
        `const db = drizzle(conn, { schema });`
4.  **build issues:**  
    *   in monorepos or complex setups, make sure all schema/relation files are included in the build.
5.  **multiple drizzle instances:**  
    *   use a single shared drizzle client (e.g., export `db` from `src/db/index.ts`).

