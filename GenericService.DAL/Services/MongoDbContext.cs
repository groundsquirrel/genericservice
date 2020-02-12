using MongoDB.Driver;

namespace GenericService.DAL.Services.Abstractions
{
    /// <summary>
    /// The MongoDb context
    /// </summary>
    public class MongoDbContext : IMongoDbContext
    {
        /// <summary>
        /// The IMongoClient from the official MongoDB driver
        /// </summary>
        public IMongoClient Client { get; }

        /// <summary>
        /// The IMongoDatabase from the official MongoDB driver
        /// </summary>
        public IMongoDatabase Database { get; }


        /// <summary>
        /// The constructor of the MongoDbContext, it needs an object implementing <see cref="IMongoDatabase"/>.
        /// </summary>
        /// <param name="mongoDatabase">An object implementing IMongoDatabase</param>
        public MongoDbContext(IMongoDatabase mongoDatabase)
        {
            // Avoid legacy UUID representation: use Binary 0x04 subtype.
            InitializeGuidRepresentation();
            Database = mongoDatabase;
            Client = Database.Client;
        }

        /// <summary>
        /// The constructor of the MongoDbContext, it needs a connection string and a database name. 
        /// </summary>
        /// <param name="connectionString">The connections string.</param>
        /// <param name="databaseName">The name of your database.</param>
        public MongoDbContext(string connectionString, string databaseName)
        {
            InitializeGuidRepresentation();
            Client = new MongoClient(connectionString);
            Database = Client.GetDatabase(databaseName);
        }


        /// <summary>
        /// The constructor of the MongoDbContext, it needs a connection string and a database name. 
        /// </summary>
        /// <param name="client">The MongoClient.</param>
        /// <param name="databaseName">The name of your database.</param>
        public MongoDbContext(MongoClient client, string databaseName)
        {
            InitializeGuidRepresentation();
            Client = client;
            Database = client.GetDatabase(databaseName);
        }

        /// <summary>
        /// Returns a collection for a document type. Also handles document types with a partition key.
        /// </summary>
        /// <typeparam name="TDocument">The type representing a Document.</typeparam>
        /// <param name="collectionName">The optional value of the partition key.</param>
        public virtual IMongoCollection<TDocument> GetCollection<TDocument>(string collectionName)
        {
            return Database.GetCollection<TDocument>(collectionName);
        }
    

        /// <summary>
        /// Initialize the Guid representation of the MongoDB Driver.
        /// Override this method to change the default GuidRepresentation.
        /// </summary>
        protected virtual void InitializeGuidRepresentation()
        {
            // by default, avoid legacy UUID representation: use Binary 0x04 subtype.
            MongoDefaults.GuidRepresentation = MongoDB.Bson.GuidRepresentation.Standard;
        }


    }
}