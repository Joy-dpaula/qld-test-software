const request = require('supertest');
const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();
app.use(express.json());

const pizzasRouters = require('../routes/pizzas.js');

app.use('/api/pizzas', pizzasRouters);

describe('POST - adiciona uma pizza', () => {

    let idPizza = uuidv4();

    beforeAll(async () => {
        let pizzaId = 1;
        await request(app).delete(`/api/pizzas/${pizzaId}`)
    })

    afterAll(async () => {
        let pizzaId = 1;
        await request(app).delete(`/api/pizzas/${pizzaId}`)
    })

    it('Deve adicionar uma pizza', async () => {
         let pizzaData = {
            "name": `${idPizza}Mozarela com cabeça`,
            "description": 'Pizza test',
            "price": 30.00
         }

         const response = await request (app).post('/api/pizzas').send(pizzaData)

         console.log(response.body)

         expect(response.statusCode).toBe(201);

         expect(response.body.name).toBe(`${idPizza}Mozarela com cabeça`); 
    })

})