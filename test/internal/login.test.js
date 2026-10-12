import request from 'supertest';
import app from '../../src/app.js';
import{ expect } from 'chai'; 

// Importação de bibliotecas para fazer um mock de requisições. 
import * as sinon from 'sinon';
import authService from '../../src/services/auth.service.js';



// Testes de API Interno

describe('Login', () => {
    it('deve retornar 500 quando acontecer algum problema de conexão com o banco de dados', async () => {
        // Mock do método login do authService para simular um erro de conexão com o banco de dados
        const authServiceMock = sinon.stub(authService, 'login');
        authServiceMock.throws(new Error('Erro catastrófico'));

        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: '',
                senha: ''
            })
        
        expect(loginResposta.status).to.equal(500); 
        //expect(loginResposta.body.error).to.equal('Erro catastrófico');

        sinon.restore(); // Restaura o método original do authService após o teste
        
    })

    it('deve retornar 200 quando o usuário e senha foram coretos', async () => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin123'
        })

        expect(loginResposta.status).to.equal(200); 
    })

    it('deve retornar 400 quando os campos email e senha não forem informados', async () => {
        const loginResposta = await request (app)
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
        const loginResposta = await request (app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin.com',
                senha: 'admin123'
            })
        expect(loginResposta.status).to.equal(401);
    })
})