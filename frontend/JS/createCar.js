async function createCar() { //Criamos uma funçao assicrona com o async.
  const title = document.getElementById('title').value; //Ele obtem o id do Input do HTML, value e pra pegar o valor que o usuario definiu no input e salvar no variavel.
  const brand = document.getElementById('brand').value; //Ele obtem o id do Input do HTML, value e pra pegar o valor que o usuario definiu no input e salvar no variavel.
  const price = document.getElementById('price').value; //Ele obtem o id do Input do HTML, value e pra pegar o valor que o usuario definiu no input e salvar no variavel.
  const age = document.getElementById('age').value; //Ele obtem o id do Input do HTML, value e pra pegar o valor que o usuario definiu no input e salvar no variavel.

  const carData = { //
    title: title, //Titulo no caso é o modelo do carro ele pega o valor e define e salva na API 
    brand: brand, //Brand no caso é o marca do carro ele pega o valor e define e salva na API 
    price: price, //Price no caso é o price do carro ele pega o valor e define e salva na API 
    age: parseInt(age), //Age no caso é o Ano do carro ele pega o valor e define e salva na API.
  };

  try {
    const response = await fetch('http://localhost:3000/api/createCar', { //Aqui fazemos uma requisiçao, chamando um funçao fetch, await para esperar que a requisição seja concluida antes de prosseguir. É a reposta da requisição será salva na variavel 
      method: 'POST', //Metodo de POST, POST e usado para criar uma data no banco de dados.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData), //Aqui converte o carData para uma String JSON
    });

    const responseData = await response.json(); //Essa variavel contem a reposta usando o fetch, aqui usamos o metodo json.
    const responseDiv = document.getElementById('response'); // aqui obtemos a ID no HTML da Div, permite que o codigo manipule ou exiba a resposta da requisiçao no DOM
  
responseDiv.innerHTML =// Após criar o carro com sucesso, exibir a mensagem formatada na div 'responseDiv'
responseDiv.innerHTML = `
  <p style="text-align: center; color: green;">
    <strong>Carro criado com sucesso!</strong><br>
    <br>
    <strong style="color: black;">Modelo:</strong> <span style="color: black;">${responseData.title}</span>, 
    <strong style="color: black;">Marca:</strong> <span style="color: black;">${responseData.brand}</span>, 
    <strong style="color: black;">Preço:</strong> <span style="color: black;">${responseData.price}</span>, 
    <strong style="color: black;">Ano:</strong> <span style="color: black;">${responseData.age}</span>
  </p>`;
  } catch (error) { //Catch para lidar com o erro, usamos o try para entrelaçar os codigos em um bloco.
    console.error('Erro ao criar carro:', error); //Aparece um log do erro no caso nao foi possivel criar um carro na API.
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Ocorreu um erro ao criar o carro.';
  }

  clearForm(); // Limpar os campos do formulário após criar o carro com sucesso

}

function clearForm() { //Função limpar Formulario
  document.getElementById("title").value = ""; //Aqui limpa o input pelo id referenciado no HTML
  document.getElementById("brand").value = ""; //Aqui limpa o input pelo id referenciado no HTML
  document.getElementById("price").value = ""; //Aqui limpa o input pelo id referenciado no HTML
  document.getElementById("age").value = ""; //Aqui limpa o input pelo id referenciado no HTML
}
