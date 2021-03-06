const{ gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        _id: String
        name: String
        initials: String
        email: String
        password: String
    }
            
    extend type Query {
        getCurrentUser: User
    }
        
    extend type Mutation{
        login(email: String!, password: String!): User
        register(email: String!, password: String!, name: String!): User
        update(_id:String!, email:String!, password:String!, name:String!): String
        logout: Boolean!
    }
`

module.exports = {typeDefs:typeDefs};