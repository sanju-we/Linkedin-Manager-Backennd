import { QueryFilter, UpdateQuery, Document } from "mongoose";

export interface IBaseRepository<T extends Document> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findOne(filter: QueryFilter<T>): Promise<T | null>;
  findByEmail(email: string): Promise<T | null>;
  findAll(filter: QueryFilter<T>): Promise<T[]>;
  update(id: string, data: UpdateQuery<T>): Promise<T | null>;
  countDocuments(): Promise<number>;
}
