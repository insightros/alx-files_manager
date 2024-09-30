// Import the MongoDB client
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
    constructor() {
        // Define the MongoDB connection details using environment variables
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        // Construct the connection URL and initialize the client
        const url = `mongodb://${host}:${port}`;
        this.client = new MongoClient(url, { useUnifiedTopology: true });

        // Initialize the database reference
        this.db = null;

        // Connect to MongoDB
        this.client.connect()
            .then(() => {
                this.db = this.client.db(database);
                console.log('Connected to MongoDB');
            })
            .catch((err) => {
                console.error('Failed to connect to MongoDB:', err);
            });
    }

    // Check if the connection to MongoDB is successful
    isAlive() {
        return this.client.isConnected();
    }

    // Get the number of documents in the 'users' collection
    async nbUsers() {
        try {
            return await this.db.collection('users').countDocuments();
        } catch (error) {
            console.error('Error counting users:', error);
            return 0;
        }
    }

    // Get the number of documents in the 'files' collection
    async nbFiles() {
        try {
            return await this.db.collection('files').countDocuments();
        } catch (error) {
            console.error('Error counting files:', error);
            return 0;
        }
    }
}

// Export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
