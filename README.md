# Using MongoDB with Node.JS

https://dev.to/peppermints/using-mongodb-with-nodejs-4n94

By [Pepper](https://dev.to/peppermints)

First, create a new project.

CD into the project folder and run `npm init`. Follow those steps until you're done.

Run: 
```java
npm i mongodb
```

This will install the official MongoDB driver for Node.

Create an index.js, or main.js, depending on your main file when you ran npm init.

Run: 
```java
code index.js
```

Inside there: add this:
```java
const {MongoClient} = require("mongodb");
const mongouri = 'mongodb://your_connection_string';
const client = new MongoClient(mongouri);

client.connect().then(console.log("Connected to MongoDB"));
```

Congrats, if you run `node .`, you should see `'Connected to MongoDB'`.

Let's create a quick question database by using an asynchronous function. Add this above client.

```java
connect().then(console.log("Connected to MongoDB")); and under the constants:
async function createListing(db, collection, data) {
    await client.db(db).collection(collection).insertOne(data);
}
Then, under client.connect(..., put:
createListing('question', 'questions', {
    question: "What's 2+2?",
    answer: 4
});
```

Go ahead and run `node .`

If you have access to your database, you should see that listing in the database.

Let's read a listing and compare an answer by creating another asynchronous function. Under the 'createListing' function, add:
```java
async function readListing(db, collection, data) {
    const result = await client.db(db).collection(collection).findOne(data);
    if(result === null || result === undefined) {
        return false;
    }
    return result;
}
```
Then, let's remove the lines where we created our listing, and we will replace it with:
```java
let guess = 4;
const res = readListing('question', 'questions', {
    answer: guess
});
if(res === false) {
    console.log("Oops, you got it wrong.");
} else {
    console.log("Yay! You got it right!");
}
```
And now, we will run `node .`, it should output: `"Yay! You got it right!"`

Congratulations! You've just created and read data from a database!

To the beginners: Keep learning. You never know what you can accomplish if you keep putting your all into it. This tutorial has just showed you how to use one of the BEST databases out there, very easily. So go and do what we all beginners should do, keep learning, and keep attempting new things. Good luck!