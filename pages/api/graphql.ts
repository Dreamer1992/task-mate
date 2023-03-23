import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// схема - это коллекция типов (`typeDefs`),
// которые определяют "форму" выполняемых запросов
const typeDefs = `#graphql
	type Book {
		title: String
		author: String
	}
  
	type Query {
		books: [Book]
	}
`

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
]

// Резолверы определяют способ получения типов, определенных в схеме.
const resolvers = {
    Query: {
        books: () => books,
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

// @ts-ignore
const { url } = await startStandaloneServer(server)
console.log(`🚀 Server listening at: ${url}`)
