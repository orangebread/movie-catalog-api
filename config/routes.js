const router = require('express').Router();

// health check
router.use('/api/health', (req, res) => {
    res.json({ success: true, message: 'Working!'});
});

router.use('/api/movies', require('../movies/movies.routes'));

// catch everything else
router.use('*', (req, res) => {
    res.json({ success: true, message: `What you seek is in another route` });
});

module.exports = router