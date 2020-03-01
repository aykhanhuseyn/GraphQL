const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
// const mongoose = require('mongoose');

// mongoose.connect(
//   'mongodb+srv://aykhanhuseyn:Pwd123456@mongodb-sorft.mongodb.net/test?retryWrites=true&w=majority'
// );
// mongoose.connection.once('open', () => {
//   console.log('connected to mongodb');
// });
const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://aykhanhuseyn:Pwd123456@mongodb-sorft.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db('test').collection('devices');
  // perform actions on the collection object
  client.close();
});

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000);
