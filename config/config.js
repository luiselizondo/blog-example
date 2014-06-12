var config = {}

// Components enabled, do not change
config.components = [
	"frontpage",
	"blog"
];

// secret key, change it to encrypt your strings using this key
config.secretKey = "your-secret-key-goes-here";

// directory where you want to save the uploaded files, make sure the user 
// running the node process has permissions to write in this directory
config.directoryUploads = "/var/files";

// enable socket.io, do not disable unless you're having problems with it.
config.enableIO = false;

// mongodb configuration
config.mongodb = {
	hostname: process.env.MONGODB_PORT_27017_TCP_ADDR || "localhost",
	database: process.env.MONGODB_DATABASE || "blog",
	port: process.env.MONGODB_PORT_27017_TCP_PORT || "27017"
}

config.mongodburi = "mongodb://" + config.mongodb.hostname + ":" + config.mongodb.port + "/" + config.mongodb.database;

config.port = process.env.PORT || "3000";

module.exports = config;