const express = require('express'); //Biblioteca do node.
const axios = require('axios'); //Biblioteca para conseguir consumir a API.
const cors = require('cors');

const app = express(); //Ele permite definir rotas, adicionar middleware e configurar o servidor para lidar com solicitações HTTP.
const ConsumirAPI = 'http://api-test.bhut.com.br:3000/api/cars'; // Aqui a variavel da API que deve ser consumida.

app.use(cors());

app.get('/api/listCars', async(req, res) => { //Aqui definimos uma rota para o HTTP get com o caminho /api/listCards.
    try{ //para envolver o codigo e lançar conexões.
        const response = await axios.get(ConsumirAPI); //Aqui criamos uma variavel response para armazenar a reposta da API, usamos a biblioteca axios para fazer uma chamada HTTP,
        const carsData = response.data; //Aqui extraimos os dados da repostas da API
        
        res.json(carsData); //respondemos a solicitação do cliente.
    
    }catch (error){ //Se ocorrer algum erro do codigo try, passsara para o catch
        console.log('Falha a buscar carros na API.'); //Aqui exibimos o tipo do erro.
        res.status(500).json({ error: 'Ocorreu um erro ao buscar.'}); //Em caso de erro ao contrario do que acontece no Try, aqui a acontece que respondemos a solicitaçao do cliente com o erro

    }
});

const port = 3000; //Definimos a variavel da porta e atribuimos o valor 3000 a ela.
app.listen(port, () =>{ //Aqui chamos o listen ouvir a solicitaçao na porta 3000
    console.log('Servidor rodando da porta ${port}'); //Exibe a mensagem dizendo que o servidor esta on.
});

