import {
  Model,
  Document,
  UpdateQuery,
  QueryOptions,
  QueryFilter
} from "mongoose";

import { logger } from "../utils/logger.ts";
import { IBaseRepository } from "../core/Interface/Respository/IBaseRepositrory.ts";

export class RepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RepositoryError";
  }
}

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
    logger.debug(`BaseRepository initialized for model ${model.modelName}`);
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const newItem = new this.model(data);
      const savedItem = await newItem.save();
      logger.info(`Created document for ${this.model.modelName}, ID: ${savedItem._id}`);
      return savedItem;
    } catch (error: any) {
      logger.error(`Create failed (${this.model.modelName}): ${error.message}`);
      throw new RepositoryError(`Failed to create document: ${error.message}`);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id).exec();
    } catch (error: any) {
      logger.error(`Find by ID failed (${this.model.modelName}): ${error.message}`);
      throw new RepositoryError(`Failed to find document: ${error.message}`);
    }
  }

  async findOne(filter: QueryFilter<T>): Promise<T | null> {
    try {
      return await this.model.findOne(filter).exec();
    } catch (error: any) {
      logger.error(`FindOne failed (${this.model.modelName}): ${error.message}`);
      throw new RepositoryError(`Failed to query document: ${error.message}`);
    }
  }

  async findByEmail(email: string): Promise<T | null> {
    try {
      return await this.model.findOne({ email } as QueryFilter<T>).exec();
    } catch (error: any) {
      logger.error(`findByEmail failed (${this.model.modelName}): ${error.message}`);
      throw new RepositoryError(`Failed to find email: ${error.message}`);
    }
  }

  async findAll(filter: QueryFilter<T> = {}, options: QueryOptions = {}): Promise<T[]> {
    try {
      return await this.model.find(filter, null, options).exec();
    } catch (error: any) {
      logger.error(`findAll failed (${this.model.modelName}): ${error.message}`);
      throw new RepositoryError(`Failed to find documents: ${error.message}`);
    }
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      return await this.model
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
    } catch (error: any) {
      logger.error(`Update failed (${this.model.modelName}): ${error.message}`);
      throw new RepositoryError(`Failed to update document: ${error.message}`);
    }
  }

  async countDocuments(): Promise<number> {
    try {
      return await this.model.countDocuments();
    } catch (error: any) {
      logger.error(`Count failed (${this.model.modelName}): ${error.message}`);
      throw new RepositoryError(`Failed to count: ${error.message}`);
    }
  }
}
