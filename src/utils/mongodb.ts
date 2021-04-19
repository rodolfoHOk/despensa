import MongoClient from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

declare global {
  namespace NodeJS {
    interface Global {
      mongo: { 
        conn: {
          client: MongoClient.MongoClient,
          db: MongoClient.Db
        },
        promise: Promise<{
          client: MongoClient.MongoClient,
          db: MongoClient.Db
        }>
      }
    }
  }
}

let cache = global.mongo;

if (!cache) {
  cache = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const opts: MongoClient.MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    
    cache.promise = MongoClient.connect(MONGODB_URI, opts)
      .then(client => {
        return {
          client: client,
          db: client.db(MONGODB_DB)
        }
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
