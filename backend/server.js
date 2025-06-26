const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express'); 
const typeDefs = require('./graphql/schema'); 
const resolvers = require('./graphql/resolvers');

const startServer = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  await mongoose.connect('mongodb://localhost:27017/bookbuddy');
  console.log('✅ MongoDB connected');

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(5000, () => {
    console.log('🚀 Server running at http://localhost:5000/graphql');
  });
};

startServer();