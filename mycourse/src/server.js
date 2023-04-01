const { port } = require('./config');
const app = require('./app');
const connectDB = require('./db');

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server start on port ${port}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
})();

