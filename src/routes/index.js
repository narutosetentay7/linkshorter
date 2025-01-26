const { Router } = require('express');
const { nanoid } = require('nanoid');
const Link = require('../models/Link');
const router = Router();
const path = require('path');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const link = await Link.findOne({ id });
    if (!link) {
        res.redirect('/');
    } else {
        res.redirect(link.url);
    }
});

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views', 'index.html'));
});
router.post('/', async (req, res) => {
    const { url } = req.body;
    const id = nanoid(8);
    const newLink = new Link({
        url,
        id
    });

    const savedLink = await newLink.save();
    res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        h3 {
            color: #28a745;
            font-family: 'Roboto';
            font-size: 18pt;
            text-align: center;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <script src="/font-awesome.js"></script>

    <h3><i class="fa-solid fa-circle-check"></i> Short link sucessfully copied to clipboard </h3>
    <script>
        navigator.clipboard.writeText("${req.protocol + '://' + req.get("host")}/${id}");
    </script>
</body>
</html>
           
    `);
});

module.exports = router;