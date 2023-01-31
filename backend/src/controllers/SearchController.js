const { default: axios } = require('axios')
const sanitizeQueryParam = require('../utils/sanitizeQueryParam')
const SearchValidation = require('../validations/SearchValidation')

class SearchController {

    static async search(req, res) {
        const {
            uf,
            city,
            logradouro
        } = req.query

        const validation = SearchValidation.validate({
            uf,
            city,
            logradouro 
        })

        if(!validation.isValid) {
            return res.status(400).json({errors: validation.errors})
        }

        // chamando a api externa

        // string.replace(/[^a-zA-Z0-9]/g, "")

        const sanitizedLogradouro = sanitizeQueryParam(logradouro)

        axios.get(`https://viacep.com.br/ws/${uf}/${city}/${sanitizedLogradouro}/json/`)
            .then(response => {
                if(response.data.length == 0) {
                    return res.status(400).json({errors: ['Endereço não encontrado']})
                } else {
                    const jsonRes  = response.data.map(address => ({
                        cep: address.cep,
                        logradouro: address.logradouro,
                        uf: address.uf,
                        localidade: address.localidade,
                        bairro: address.bairro,
                    }))
                    return res.status(200).json(jsonRes)
                }
            })
            .catch(err => {
                console.error(err)
                return res.status(503).json({errors: ['Falha ao buscar em api externa']})
            })
    }
}

module.exports = SearchController