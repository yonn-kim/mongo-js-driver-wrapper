import MongoConnection from './MongoConnection';


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'local';

const conn = new MongoConnection(url, {useNewUrlParser: true});
conn.setCatalog(dbName);
conn.execute('db.products.find({})');