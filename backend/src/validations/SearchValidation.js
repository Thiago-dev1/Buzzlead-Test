class SearchValidation {
    static validate(data) {
        const {
            uf,
            city,
            logradouro
        } = data

        let errors = []

        if(!uf) {
            errors.push('Estado obrigatório')
        }

        if(uf.length < 2) {
            errors.push('Estado tem que conter dois caracteres')
        }

        if(!city) {
            errors.push('Cidade obrigatório')
        }

        if(city.length < 3) {
            errors.push('Cidade tem que conter ao menos três caracteres')
        }

        if(!logradouro) {
            errors.push('Logradouro obrigatório')
        }

        if(logradouro.length < 3) {
            errors.push('Logradouro tem que conter ao menos três caracteres')
        }

        if(city != 'Goiânia' || uf != 'GO') {
            errors.push('Consulta apenas para Goiânia(GO)')
        }

        return {
            errors,
            isValid: !errors.length
        }
    }
}

module.exports = SearchValidation