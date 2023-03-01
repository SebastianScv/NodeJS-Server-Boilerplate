import { IDatabase } from '../interfaces/IDatabase';
import { v4 as generateGUID } from 'uuid';
import { ObjectId } from 'mongodb';

const MongoClient = require('mongodb').MongoClient;

const DB_NAME = 'todo';

export class MongoDatabase implements IDatabase {
    private _connection: any;

    constructor() {
        const uri = 'mongodb://mongodb:27017/test';
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect((err: any) => {
            if (err) {
                console.log(err);
            } else {
                this._connection = client;
                console.log('Connection established to database');
            }
        });
    }
    async find(table: string, item: any): Promise<any[]> {
        try {
            const collection = this._connection.db(DB_NAME).collection(table);
            const documents = await collection.find(item).toArray();
            return documents;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async findBy(
        table: string,
        criteria: string,
        value: unknown
    ): Promise<any[]> {
        try {
            const collection = this._connection.db(DB_NAME).collection(table);
            const documents = await collection
                .find({
                    [criteria]: value,
                })
                .toArray();
            return documents;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async findOne(table: string, id: string): Promise<any> {
        try {
            const collection = this._connection.db(DB_NAME).collection(table);
            const document = await collection.findOne({
                _id: new ObjectId(id),
            });
            return document;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async findAll(table: string): Promise<any[]> {
        try {
            const collection = this._connection.db(DB_NAME).collection(table);
            const documents = await collection.find().toArray();
            return documents;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async removeAll(table: string, criteria: string, value: unknown) {
        try {
            const collection = this._connection.db(DB_NAME).collection(table);
            const deleteResult = await collection.deleteMany({
                [criteria]: value,
            });
            console.log(`${deleteResult.deletedCount} documents deleted`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async create(table: string, item: any): Promise<boolean> {
        try {
            const collection = this._connection.db(DB_NAME).collection(table);
            await collection.insertOne(item);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async update(table: string, id: string, item: any): Promise<boolean> {
        try {
            const collection = this._connection.db(DB_NAME).collection(table);
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: item }
            );
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async delete(table: string, id: string): Promise<boolean> {
        try {
            const collection = this._connection.db(DB_NAME).collection(table);
            await collection.deleteOne({ _id: new ObjectId(id) });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}
