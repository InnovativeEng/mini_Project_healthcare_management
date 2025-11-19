
// import mongoose from "mongoose";

// export const dbConnection = () => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       dbName: "MERN_STACK",
//     })
//     .then(() => {
//       console.log("Connected to database!");
//     })
//     .catch((err) => {
//       console.log(`Some error occurred while connecting to database: ${err}`);
//     });
// };










import mongoose from "mongoose";

export const dbConnection = () => {
  let mongoURI = "";

  // Choose between cloud or local DB
  if (process.env.ACTIVE_DB === "local") {
    mongoURI = process.env.MONGO_URI_LOCAL;
    console.log("Using Local MongoDB (Compass)");
  } else {
    mongoURI = process.env.MONGO_URI_CLOUD;
    console.log("Using MongoDB Cloud (Atlas)");
  }

  mongoose
    .connect(mongoURI, {
      dbName: "MERN_STACK",
    })
    .then(() => {
      console.log("Connected to database successfully!");
    })
    .catch((err) => {
      console.log("Database connection failed:", err);
    });
};
