const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

/* var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/doanweb',
  collection: 'session',
  databaseName: 'doanweb'
}); */
// var store = new MongoDBStore({
//   uri: "mongodb://localhost:27017/form_dev",
//   collection: "session",
//   databaseName: "form_dev",
// });

var store = new MongoDBStore({
  uri: 'mongodb+srv://dbUser5:dbUser5@cluster0.w7ggh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  collection: 'session',
  databaseName: 'doanweb'
});

store.on("error", function (error) {
  console.log(error);
});

module.exports = function (app) {
  app.use(
    session({
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      secret: "SECRET!",
      store: store,
    })
  );
};
