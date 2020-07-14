const cors = require('cors');
const express = require('express');
const path = require('path');

const auth = require('./middleware/auth.js');
const recipeRouter = require('./routers/recipe');
const userRouter = require('./routers/user');
const { handleError } = require('./utils/error');

const app = express();

/*
  MIDDLEWARE
*/

app.use(cors());

// Log information about every incoming request
app.use((req, res, next) => {
  const { method, path } = req;
  console.log(
    `New request to: ${method} ${path} at ${new Date().toISOString()}`
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth.initialize());

/*
  ROUTE HANDLERS
*/
app.get('/', (req, res) => {
  res.redirect('/api/v1/recipes');
});

app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/users', userRouter);

app.use(handleError);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});