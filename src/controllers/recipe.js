const recipeModel = require('../models/recipe');

const deleteRecipe = async (req, res, next) => {
  try {
    await recipeModel.remove(parseInt(req.params.id));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await recipeModel.getAll();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const recipe = await recipeModel.get(parseInt(req.params.id));
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const saveRecipe = async (req, res, next) => {
  try {
    const newRecipe = await recipeModel.save(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await recipeModel.update({
      id: parseInt(req.params.id),
      content: req.body,
    });
    res.json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  saveRecipe,
  updateRecipe,
};