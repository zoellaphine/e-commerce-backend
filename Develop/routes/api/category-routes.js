const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await fetch(Category.findAll({ include: [{ model: Product }]}));
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Categories not found' });
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id.id, { include: [{ model: Product }]});

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found ' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Category not found' })
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category + 'created');
  } catch (error) {
    // 400 this time because we arent pulling for anything so we can only have syntax errors
    res.status(400).json({ message: 'Something went wrong:' + error})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, { where: {id: req.params.id }});

    if (category[0]) {
      res.status(200).json(category + 'updated');
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({message: 'Category not found' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({ where: { id: req.params.id }});

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json(category) + 'deleted';
    }
  } catch (error) {
    res.status(500).json({ message: 'Category not found' })
  }
});

module.exports = router;
