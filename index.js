const {MongoClient} = require("mongodb");
const mongouri = 'mongodb://your_connection_string';
const client = new MongoClient(mongouri);

async function createListing(db, collection, data) {
    await client.db(db).collection(collection).insertOne(data);
}

async function readListing(db, collection, data) {
    const result = await client.db(db).collection(collection).findOne(data);
    if(result === null || result === undefined) {
        return false;
    }
    return result;
}

client.connect().then(console.log("Connected to MongoDB"));

createListing('question', 'questions', {
    question: "What's 2+2?",
    answer: 4
});

let guess = 4;
const res = readListing('question', 'questions', {
    answer: guess
});
if(res === false) {
    console.log("Oops, you got it wrong.");
} else {
    console.log("Yay! You got it right!");
}