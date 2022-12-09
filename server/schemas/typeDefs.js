const { gql } = require('apollo-server-express');

const typeDefs = gql`
    union SearchResults = User | Group
    type User {
        _id: ID
        username: String
        email: String
        password: String 
        memberships: [Group]
        message: String!
    }

    type Group {
        _id: ID
        name: String
        ownerID: User
        members: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        search(contains: ID): [SearchResults!]
        group: [Group]
        user: User
        users: [User]
        singleUserGroups(userID:ID!): User
        allUsersInAGroup(groupID:ID!): Group
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addGroup(ownerID: ID!, name: String!, membersID: ID!): Group
        addMembers(groupID:ID!, newMemberID: ID!): Group
        removeUser(userID: ID!): User
        removeGroup(groupID: ID!, userID: ID!): Group
    }
`;

module.exports = typeDefs;