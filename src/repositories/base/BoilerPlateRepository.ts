import BoilerPlateModel from '../../models/BoilerPlateModel';
import { IDatabase } from '../interfaces/IDatabase';
import { BaseRepository } from './BaseRepository';

export class BoilerPlateRepository extends BaseRepository<BoilerPlateModel> {
    private static instance: BoilerPlateRepository;
    private static database: IDatabase;

    private static readonly TABLE: string = 'tasks';

    private constructor(database: IDatabase) {
        if (!database) {
            console.error(
                'Could not create ProductsRepository, database should be provided'
            );
            return;
        }
        super(database);
    }

    public static getInstance(): BoilerPlateRepository {
        if (!BoilerPlateRepository.instance) {
            BoilerPlateRepository.instance = new BoilerPlateRepository(
                this.database
            );
        }

        return BoilerPlateRepository.instance;
    }

    public static setDatabase(database: IDatabase) {
        this.database = database;
    }

    async findAll() {
        return await super.findAll(BoilerPlateRepository.TABLE);
    }

    async findByCategory(categoryId: string) {
        return await super.findBy(
            BoilerPlateRepository.TABLE,
            'categoryId',
            categoryId
        );
    }

    async removeTasksForCategory(categoryId: string) {
        return await super.removeAll(
            BoilerPlateRepository.TABLE,
            'categoryId',
            categoryId
        );
    }

    async createTask(item: BoilerPlateModel) {
        return await super.create(BoilerPlateRepository.TABLE, item);
    }

    async updateTask(id: string, task: BoilerPlateModel) {
        return await super.update(BoilerPlateRepository.TABLE, id, task);
    }

    async findOne(id: string) {
        return await super.findOne(BoilerPlateRepository.TABLE, id);
    }

    async removeTask(id: string) {
        return await super.delete(BoilerPlateRepository.TABLE, id);
    }
}
