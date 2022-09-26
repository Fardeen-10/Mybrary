const express = require('express');
const router = express.Router();
const Author = require('../models/authors')


//All Author rote
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    // console.log(searchOptions)
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//New  Authour  route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// Create Author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        res.redirect('authors')
        // res.redirect(`authors/${author._id}`)
    } catch {
        res.redirect('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }

})



module.exports = router;

