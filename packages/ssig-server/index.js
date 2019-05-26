require("dotenv").config()

const app = require('./app');
const port = process.env.SERVER_PORT || 3000;

app.listen(port, err => {
  if (err) {
    console.error(e);
  }

  console.log(`ssig server running on port ${port}`);
});
