const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://dbChrisF:${ATLAS_PASSWORD}@first-cluster.jvsa2.mongodb.net/cardspedia?retryWrites=true&w=majority";

module.exports = MONGO_URI;
