export interface IDatabase {
    find(table: string, item: any): Promise<any[]>;
    findOne(table: string, id: string): Promise<any>;
    findBy(table: string, criteria: string, value: unknown): Promise<any>;
    findAll(table: string): Promise<any[]>;
    removeAll(table: string, criteria: string, value: unknown): Promise<any>;
    create(table: string, item: any): Promise<boolean>;
    update(table: string, id: string, item: any): Promise<boolean>;
    delete(table: string, id: string): Promise<boolean>;
}
