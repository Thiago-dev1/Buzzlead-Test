const { Router } = require('express')
const SearchController = require('./controllers/SearchController')

const router = Router()

router.get('/buscar', SearchController.search)

module.exports = router 