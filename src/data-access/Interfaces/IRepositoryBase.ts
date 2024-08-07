export interface IRepositoryBase<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<T | null>;
  update(entity: T): Promise<T | null>;
  delete(id: T): Promise<boolean>;
}
