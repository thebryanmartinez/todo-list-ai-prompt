// db.ts
import { Dexie, type EntityTable } from 'dexie'

interface Example {
  id: number
  name: string
  age: number
}

const db = new Dexie('ExampleDatabase') as Dexie & {
  friends: EntityTable<Example, 'id'>
}

db.version(1).stores({
  friends: '++id, name, age'
})

export type { Example }
export { db }
