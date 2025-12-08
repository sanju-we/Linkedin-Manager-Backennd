"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = exports.RepositoryError = void 0;
const logger_1 = require("../utils/logger");
class RepositoryError extends Error {
    constructor(message) {
        super(message);
        this.name = "RepositoryError";
    }
}
exports.RepositoryError = RepositoryError;
class BaseRepository {
    constructor(model) {
        this.model = model;
        logger_1.logger.debug(`BaseRepository initialized for model ${model.modelName}`);
    }
    async create(data) {
        try {
            const newItem = new this.model(data);
            const savedItem = await newItem.save();
            logger_1.logger.info(`Created document for ${this.model.modelName}, ID: ${savedItem._id}`);
            return savedItem;
        }
        catch (error) {
            logger_1.logger.error(`Create failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to create document: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            return await this.model.findById(id).exec();
        }
        catch (error) {
            logger_1.logger.error(`Find by ID failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to find document: ${error.message}`);
        }
    }
    async findOne(filter) {
        try {
            return await this.model.findOne(filter).exec();
        }
        catch (error) {
            logger_1.logger.error(`FindOne failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to query document: ${error.message}`);
        }
    }
    async findByEmail(email) {
        try {
            return await this.model.findOne({ email }).exec();
        }
        catch (error) {
            logger_1.logger.error(`findByEmail failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to find email: ${error.message}`);
        }
    }
    async findAll(filter = {}, options = {}) {
        try {
            return await this.model.find(filter, null, options).exec();
        }
        catch (error) {
            logger_1.logger.error(`findAll failed (${this.model.modelName}): ${error.message}`);
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
            logger_1.logger.error(`Update failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to update document: ${error.message}`);
        }
    }
    async countDocuments() {
        try {
            return await this.model.countDocuments();
        }
        catch (error) {
            logger_1.logger.error(`Count failed (${this.model.modelName}): ${error.message}`);
            throw new RepositoryError(`Failed to count: ${error.message}`);
        }
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=Base.repository.js.map