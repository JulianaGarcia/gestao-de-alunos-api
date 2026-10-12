import request from 'supertest';
import app from '../../src/app.js';
import{ expect } from 'chai'; 

// Testes de API Interno

describe('Login', () => {
    it('deve retornar 200 quando o usuário e senha foram coretos', async () => {
        const loginResposta = await request('localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin123'
        })

        expect(loginResposta.status).to.equal(200); 
    })

    it('deve retornar 400 quando os campos email e senha não forem informados', async () => {
        const loginResposta = await request ('localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: '',
                senha: ''
            })
        expect(loginResposta.status).to.equal(400);
        expect(loginResposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    })

    it('deve retornar 401 quando o usuário ou senha forem incorretos', async () => {
        const loginResposta = await request ('localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin.com',
                senha: 'admin123'
            })
        expect(loginResposta.status).to.equal(401);
    })
})