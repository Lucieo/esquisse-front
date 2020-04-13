const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { env } = require('../../cypress')
const chalk = require('chalk');

const url = env.mongoUri;

// Database Name
const dbName = 'test';
const command = process.argv[2];

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log(chalk.green("Connected successfully to server"));

    const db = client.db(dbName);

    let promise = Promise.resolve();
    if (command === 'reset') {
        console.log(chalk.green(`Dropping database ${dbName}`))
        promise = db.dropDatabase()
    } else if (command === 'seed') {
        // TODO
    }
    promise.then(() => {
        client.close();
    });
});