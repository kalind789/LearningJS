const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'taskManager';

async function connectDB(){
    try{
        await client.connect();
        console.log(`connected to MongoDB`);
        return client.db(dbName);
    }catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function addTasks(taskName, taskDesc){
    try{
        const db = await connectDB();
        const result = await db.collection('tasks').insertOne({taskName, taskDesc});
    }catch (error) {
        console.error('Error adding to MongoDB:', error);
    }
}

async function getTasks(){
    try{
        const db = await connectDB();
        const tasks = await db.collection('tasks').find().toArray();
        return tasks;
    }catch (error) {
        console.error('Error adding to MongoDB:', error);
        return [];
    }
}

module.exports = {getTasks, addTasks};