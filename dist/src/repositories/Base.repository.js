import { logger } from "../utils/logger.ts";
export class RepositoryError extends Error {
    constructor(message) {
        super(message);
        this.name = "RepositoryError";
    }
}
export class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
        logger.debug(`BaseRepository initialized for model ${model.modelName}`);
    }
    async create(data) {
        try {
            const newItem = new this.model(data);
            const savedItem = await newItem.save();
            logger.info(`Created document for ${this.model.modelName}, ID: ${savedItem._id}`);
            return savedItem;
        }
        catch (error) {
            logger.error(`Create failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to create document: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            return await this.model.findById(id).exec();
        }
        catch (error) {
            logger.error(`Find by ID failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to find document: ${error.message}`);
        }
    }
    async findOne(filter) {
        try {
            return await this.model.findOne(filter).exec();
        }
        catch (error) {
            logger.error(`FindOne failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to query document: ${error.message}`);
        }
    }
    async findByEmail(email) {
        try {
            return await this.model.findOne({ email }).exec();
        }
        catch (error) {
            logger.error(`findByEmail failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to find email: ${error.message}`);
        }
    }
    async findAll(filter = {}, options = {}) {
        try {
            return await this.model.find(filter, null, options).exec();
        }
        catch (error) {
            logger.error(`findAll failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to find documents: ${error.message}`);
        }
    }
    async update(id, data) {
        try {
            return await this.model
                .findByIdAndUpdate(id, data, { new: true })
                .exec();
        }
        catch (error) {
            logger.error(`Update failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to update document: ${error.message}`);
        }
    }
    async countDocuments() {
        try {
            return await this.model.countDocuments();
        }
        catch (error) {
            logger.error(`Count failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to count: ${error.message}`);
        }
    }
}
//# sourceMappingURL=Base.repository.js.map