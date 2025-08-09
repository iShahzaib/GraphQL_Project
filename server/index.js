import express from 'express';
import cors from 'cors';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();

// ✅ Use CORS middleware
app.use(cors());

const uri = 'mongodb+srv://mohdshahzaibhussain:p7vv7lkWOD6av7v5@cluster0.g6eyhwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
const client = new MongoClient(uri);
let db;

// Connect to MongoDB
async function connectDB() {
  await client.connect();
  db = client.db('MSH_NewProject'); // Your database name
  console.log('Connected to MongoDB');
}

connectDB();

// Define schema
const schema = buildSchema(`
    type User {
      _id: ID
      name: String
      email: String
    }

    type Query {
      getUsers: [User]
      getUser(id: ID!): User
    }

    type Mutation {
      addUser(name: String!, email: String!): User
      updateUser(id: ID!, name: String, email: String): User
      deleteUser(id: ID!): String
    }
`);

// Define resolver
const root = {
  getUsers: async () => {
    return await db.collection('users').find().toArray();
  },
  getUser: async ({ id }) => {
    return await db.collection('users').findOne({ _id: new ObjectId(id) });
  },
  addUser: async ({ name, email }) => {
    const result = await db.collection('users').insertOne({ name, email });
    return { _id: result.insertedId, name, email };
  },
  updateUser: async ({ id, name, email }) => {
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;

    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    return await db.collection('users').findOne({ _id: new ObjectId(id) });
  },
  deleteUser: async ({ id }) => {
    await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    return "User deleted";
  }
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true  // Enables GraphiQL UI in browser
}));

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});
