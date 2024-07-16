const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({
      include: [
        { model: Product }
      ]
    });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: 'Tags not found' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product}
      ]
    });

    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Tag not found' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag + 'created');
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong:' + error });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, { where: { id: req.params.id }});

    if (tag) {
      res.status(200).json(tag + 'updated');
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong:' + error })
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({ where: { id: req.params.id }});

    if (tag) {
      res.status(200).json('Tag deleted');
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong:' + error });
  }
});

module.exports = router;
