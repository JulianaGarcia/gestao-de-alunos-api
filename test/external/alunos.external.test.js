import request from 'supertest'; 
import { expect } from 'chai'; 
import { getToken } from '../helpers/auth.js';

describe.only('Alunos', () => {
    let token;

    beforeEach(async () => {
         //obter o token
        token = await getToken('admin@escola.com', 'admin123');
    })
    
    it('deve negar o cadastro de um aluno quando ele já existe', async () => {
        const alunoResposta = await request('http://localhost:3000')
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Ana Souza', 
                email: 'ana.souza@example.com', 
                matricula: '2024001',
                senha: "123456"
            })

        expect(alunoResposta.status).to.equal(409)
        expect(alunoResposta.body.error).to.equal('Já existe um aluno cadastrado com essa matrícula ou e-mail.')
    })
      
    it('deve cadasdrar um aluno quando ele informa dados válidos', async () => {            
        const alunoResposta = await request('http://localhost:3000')
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
           //.set('Authorization', 'Bearer ' + token)
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: "Juliana Garcia",
                email: "juliana.garcia@example.com",
                matricula: "2026100",
                senha: "123456"
            });

            expect(alunoResposta.status).to.equal(201); 
            expect(alunoResposta.body.nome).to.equal('Juliana Garcia')
            expect(alunoResposta.body.email).to.equal('juliana.garcia@example.com')
            expect(alunoResposta.body.matricula).to.equal('2026100')
    })

})