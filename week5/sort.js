const mongoclient = require("mongodb");
const url = "mongodb://localhost:27017/"

// Database name
const databasename = "GFG"

// Connecting to MongoDB
mongoclient.connect(url).then((db) => {
	const connect = db.db(databasename);

	// Connecting to collection
	const collection = connect.collection("Reviews");
	console.log("Connection Created")

	// Sort the document key
	const sort = { rollno: -1 }

	collection.find().sort(sort).toArray((err, ans,) => {
		if (!err) {

			// Printing the documents
			console.log(ans);
		}
	})

}).catch((err) => {
	console.log(err.Message);
})
