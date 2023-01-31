const request = require('supertest')
const app = require('../app')


describe('Search Controller', () => {
    it('Retorna um erro caso não tenha os campos preenchido', async () => {
        const response = await request(app).get('/buscar').query({
            uf: '',
            city: '',
            logradouro: ''
        })
        expect(response.status).toBe(400)
        expect(response.body.errors).toEqual([
            "Estado obrigatório",
            "Estado tem que conter dois caracteres",
            "Cidade obrigatório",
            "Cidade tem que conter ao menos três caracteres",
            "Logradouro obrigatório",
            "Logradouro tem que conter ao menos três caracteres",
            "Consulta apenas para Goiânia(GO)",
        ])
    })

    it('Retorna um erro caso o Estado não seja GO ou Cidade Goiânia', async () => {
        const response = await request(app).get('/buscar').query({
            uf: 'SP',
            city: 'São Paulo',
            logradouro: 'Avenida A'
        })

        expect(response.status).toBe(400)
        expect(response.body.errors[0]).toBe('Consulta apenas para Goiânia(GO)')
    })

    it('Retorna um erro caso não tenha o Estado preenchido', async () => {
        const response = await request(app).get('/buscar').query({
            uf: '',
            city: 'Goiânia',
            logradouro: 'ABC'
        })

        expect(response.status).toBe(400)
        expect(response.body.errors[0]).toBe('Estado obrigatório')
    })

    it('Retorna um erro caso o Estado tenha menos de 2 caracteres', async () => {
        const response = await request(app).get('/buscar').query({
            uf: 'G',
            city: 'Goiânia',
            logradouro: 'ABC'
        })

        expect(response.status).toBe(400)
        expect(response.body.errors[0]).toBe('Estado tem que conter dois caracteres')
    })

    it('Retorna um erro caso não a tenha Cidade preenchida', async () => {
        const response = await request(app).get('/buscar').query({
            uf: 'GO',
            city: '',
            logradouro: 'ABC'
        })

        expect(response.status).toBe(400)
        expect(response.body.errors[0]).toBe('Cidade obrigatório')
    })

    it('Retorna um erro caso a Cidade tenha menos de 2 caracteres', async () => {
        const response = await request(app).get('/buscar').query({
            uf: 'GO',
            city: 'Go',
            logradouro: 'ABC'
        })

        expect(response.status).toBe(400)
        expect(response.body.errors[0]).toBe('Cidade tem que conter ao menos três caracteres')
    })

    it('Retorna um erro caso não tenha o Logradouro preenchido', async () => {
        const response = await request(app).get('/buscar').query({
            uf: 'GO',
            city: 'Goiânia',
            logradouro: ''
        })

        expect(response.status).toBe(400)
        expect(response.body.errors[0]).toBe('Logradouro obrigatório')
    })

    it('Retorna um erro caso o Logradouro tenha ao menos 3 caracteres', async () => {
        const response = await request(app).get('/buscar').query({
            uf: 'GO',
            city: 'Goiânia',
            logradouro: 'AB'
        })
        
        expect(response.status).toBe(400)
        expect(response.body.errors[0]).toBe('Logradouro tem que conter ao menos três caracteres')
    })

    it('Retorna um erro caso não encontre nenhum endereço', async () => {
        const response = await request(app).get('/buscar').query({
            uf: 'GO',
            city: 'Goiânia',
            logradouro: 'qqweeqw qeeq'
        })

        expect(response.status).toBe(400)
        expect(response.body.errors[0]).toBe('Endereço não encontrado')
    })

    it('Retorna um array caso tenha encontrado algum endereço', async () => {

        const response = await request(app).get('/buscar').query({
            uf: 'GO',
            city: 'Goiânia',
            logradouro: 'Rua Faixa Verde da Avenida Goiás'
        })

        expect(response.status).toBe(200)
        expect(response.body).toEqual([{
            cep: '74565-265',
            logradouro: "Rua Faixa Verde da Avenida Goiás",
            uf: "GO",
            localidade: "Goiânia",
            bairro: "Setor Urias Magalhães",
        }])
    })
})