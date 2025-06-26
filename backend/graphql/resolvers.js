const bcrypt = require("bcrypt");
const User = require('../models/User');
const Message = require('../models/Message');

const resolvers = {
  Query: {
    hello: () => 'GraphQL is working!',
    getUser: async (_, { _id }) => {
      const user = await User.findById(_id);
      if (!user) throw new Error('User not found');
      return user;
    },
  },

  Mutation: {
    registerUser: async (_, { name, email, password }) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save(); 

      console.log("✅ User saved:", user);
      return 'User registered successfully';
    },

    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid credentials");
      }

      // Exclude password from returned user object
      const { password: pw, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    },

    submitMessage: async (_, { name, email, message }) => {
      const newMsg = new Message({ name, email, message });
      await newMsg.save(); 
      return 'Message submitted successfully';
    },

    updateUser: async (_, { _id, name, email, password }) => {
      const updateFields = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      if (password) {
        updateFields.password = await bcrypt.hash(password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $set: updateFields },
        { new: true }
      );
      if (!updatedUser) throw new Error('User not found');
      return updatedUser;
    },

    deleteUser: async (_, { _id }) => {
      const deleted = await User.findByIdAndDelete(_id);
      if (!deleted) throw new Error('User not found');
      return 'User account deleted successfully';
    },
  },
};

module.exports = resolvers;
