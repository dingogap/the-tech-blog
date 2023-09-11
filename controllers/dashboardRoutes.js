const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'date'],
        },
      ],
      order: [[Post, 'date', 'ASC']],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit Post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'content', 'date'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id', 'date'],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id' });
      return;
    }

    const post = postData.get({ plain: true });
    res.render('editpost', { post, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/add', (req, res) => {
  res.render('addpost');
});

router.get('/edit', (req, res) => {
  res.render('editpost');
});

module.exports = router;
