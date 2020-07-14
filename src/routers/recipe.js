const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  saveRecipe,
  updateRecipe,
} = require('../controllers/recipe');

router.route('/').get(getAllRecipes).post(auth.authenticate(), saveRecipe);

router
  .route('/:id')
  .get(getRecipe)
  .put(auth.authenticate(), updateRecipe)
  .delete(auth.authenticate(), deleteRecipe);

module.exports = router;