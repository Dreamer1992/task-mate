import { createYoga, createSchema } from 'graphql-yoga'
import { IResolvers } from '@graphql-tools/utils'

const typeDefs = /* GraphQL */ `
    enum TaskStatus {
        active
        completed
    }

    type Task {
        id: Int!
        title: String!
        status: TaskStatus!
    }

    input CreateTaskInput {
        title: String!
    }

    input UpdateTaskInput {
        id: Int!
        title: String
        status: TaskStatus
    }

    type Query {
        tasks(status: TaskStatus): [Task!]!
        task(id: Int!): Task
    }

    type Mutation {
        createTask(input: CreateTaskInput!): Task
        updateTask(input: UpdateTaskInput!): Task
        deleteTask(id: Int!): Task
    }
`

const resolvers: IResolvers = {
    Query: {
        tasks(parent, args, context) {
            return []
        },
        task(parent, args, context) {
            return null
        },
    },
    Mutation: {
        createTask(parent, args, context) {
            return null
        },
        updateTask(parent, args, context) {
            return null
        },
        deleteTask(parent, args, context) {
            return null
        },
    },
}

const schema = createSchema({
    typeDefs,
    resolvers,
})

export const config = {
    api: {
        // Disable body parsing (required for file uploads)
        bodyParser: false,
    },
}

export default createYoga({
    schema,
    // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
    graphqlEndpoint: '/api/graphql',
})
