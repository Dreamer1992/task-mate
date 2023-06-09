import { createYoga, createSchema } from 'graphql-yoga'
import { IResolvers } from '@graphql-tools/utils'
import mysql from 'serverless-mysql'

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

const resolvers: IResolvers<any, IApolloContext> = {
    Query: {
        async tasks(parent, args, context) {
            const result = await context.db.query(
                'SELECT "HELLO WORLD" as hello_world'
            )
            await db.end()
            console.log('🚀 ~ file: graphql.ts:45 ~ result:', { result })
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

interface IApolloContext {
    db: mysql.ServerlessMysql
}

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
    },
})

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
