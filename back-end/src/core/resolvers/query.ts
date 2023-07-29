
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

export function ApolloQueries(): Record<string, () => any> {

  return {
    GetAllBooks: async () => {
      return books
    },
    books: async () => books
  }
}