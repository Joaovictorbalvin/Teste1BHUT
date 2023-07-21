async function fetchCarsData() { //essa linha declara uma funçao assicrona para lidar com operações de forma mais concisa e clara.
    try { //try e uma estrutura para executar bloco de codigos que pode lançar exceções.
        const response = await fetch('http://localhost:3000/api/listCars'); //Essa linha faz uma chamada ao client
        const data = await response.json(); // Converte a resposta para JSON, usamos await para esperar a conversão ser concluida

        const carsDataElement = document.getElementById('carsData'); //Essa variavel obtem um elemento HTML referenciado com o id e armazena na variavel carsDataElement.
        carsDataElement.innerHTML = ''; //define o conteudo do HTML vazia removendo o conteudo que possa esta presente.

        data.forEach(car => { //realizada um loop para iterar sobre cada objeto da array 'data'.
            const carItem = document.createElement('div'); //nessa linha criamos um novo elemento div na variavel
            carItem.classList.add('car-item'); //adiciona uma classe CSS ao  elemento HTML

            const carTitle = document.createElement('div'); //nessa linha criamos um novo elemento div na variavel
            carTitle.classList.add('car-title'); //adiciona uma classe CSS ao  elemento HTML
            carTitle.innerText = car.title;

            const carInfo = document.createElement('div'); //nessa linha criamos um novo elemento div na variavel
            carInfo.classList.add('car-info'); //adiciona uma classe CSS ao  elemento HTML

            const carBrand = document.createElement('span'); //nessa linha criamos um novo elemento span na variavel
            carBrand.innerText = `Marca: ${car.brand}`;  //armazena. define. Insere uma String que representa a marca do carro

            const carPrice = document.createElement('span'); //nessa linha criamos um novo elemento span na variavel
            carPrice.innerText = `Preço: R$ ${parseFloat(car.price).toFixed(3)}`; //armazena. define. Insere uma String que representa o preço do carro, to fixed para 2 casas decimais e  parseFloat converte a String e um ponto flutuante.

            const carAge = document.createElement('span');  //nessa linha criamos um novo elemento span na variavel
            carAge.innerText = `Ano: ${car.age}`;  //armazena. define. Insere uma String que representa o Ano do carro

            carInfo.appendChild(carBrand); //aqui adicionamos carbrand como filho do elemento carinfo, appendChild permite inserir um elemento HTML dentro de outro elemento HTML
            carInfo.appendChild(carPrice); //Assim por diante,
            carInfo.appendChild(carAge);

            carItem.appendChild(carTitle);
            carItem.appendChild(carInfo);

            carsDataElement.appendChild(carItem);
        });
    } catch (error) { //Se ocorrer um erro na chamada da API executa o que esta dentro do catch.
        console.error('Erro ao buscar carros:', error); //Imprime um log de erro ao buscar carros
        const carsDataElement = document.getElementById('carsData'); //essa linha obtem a referencia do HTML com o id igual la no try e armazena a variavel.
        carsDataElement.innerHTML = 'Ocorreu um erro ao buscar os carros.'; //essa linha imprime um texto no HTML em caso de erro.
    }
}

function clearCarsData() { //Essa funçao e para limpar a array depois da chamada da api e impressao dela
    const carsDataElement = document.getElementById('carsData'); //Essa linha obtem a referencia do HTML com o id e armazena a variavel.
    carsDataElement.innerHTML = ''; //Essa variavel executa somente quando o usuario quiser limpar os dados que esta = a vazio.
}
