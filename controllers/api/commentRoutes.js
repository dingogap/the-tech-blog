// Create comment
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get All Comments Details
router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      attributes: ['id', 'comment', 'post_id', 'user_id', 'date'],

      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'date'],
        },
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No Comments found' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
