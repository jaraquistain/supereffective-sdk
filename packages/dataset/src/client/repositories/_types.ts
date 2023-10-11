import { z } from 'zod'

export interface Entity {
  id: string
  name: string
}

export type EntityValidationResult = { success: boolean; error?: Error }

export interface Repository<R extends Entity> {
  id: string
  getAll(): Promise<Array<R>>
  getById(id: string): Promise<R>
  findById(id: string): Promise<R | undefined>
  getManyByIds(ids: Array<string>): Promise<Array<R>>
}

export interface RepositoryDataProvider {
  id: string
  baseUri: string
  resolveUri(relativePath: string): string
  readFile<R extends Entity = Entity>(relativePath: string): Promise<Array<R>>
}

export type EntityUpdate<R extends Entity> = Partial<R> & { id: Entity['id'] }

export type RepositoryConfig<R extends Entity, S extends RepositoryDataProvider = RepositoryDataProvider> = {
  id: string
  schema: z.ZodSchema<R>
  resourcePath: string
  dataProvider: S
}
