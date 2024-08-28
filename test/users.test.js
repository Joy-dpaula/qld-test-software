const request = require('supertest');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const userRoutes = require('../routes/users.js')
app.use(express.json());
app.use('/api/users', userRoutes)

describe('POST - cria um usuário', () => {
    let idUser = uuidv4();

    // setup do test => preparação
    beforeAll(async () => {
        let userId = 1;
        await request(app).delete(`/api/users/${userId}`)
    })

    afterAll(async () => {
        let userId = 1;
        await request(app).delete(`/api/users/${userId}`)
    })

    it('Deve criar um usuário', async () => {
        // let idUser = uuidv4(); transferir pro escopo acima
        let userData = {
            "email": `${idUser}usuario@gmail.com`,
            "name": "Usuario test",
            "password": "12345678"
        }

        const user = await request (app).post('/api/users').send(userData)

        console.log(user.body);

        expect(user.statusCode).toBe(201);
        expect(user.body.email).toBe(`${idUser}usuario@gmail.com`); 
    })

    it('Novo usuário deve relizar login', async () => {
        let userLogin = {
            "email": `${idUser}usuario@gmail.com`,
            "password": "12345678"
        }
        const response = await request(app).post('/api/users/login').send(userLogin);
        expect(response.statusCode).toBe(200);
    })

})