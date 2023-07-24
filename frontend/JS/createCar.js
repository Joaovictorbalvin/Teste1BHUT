async function createCar() {
  const title = document.getElementById('title').value;
  const brand = document.getElementById('brand').value;
  const price = document.getElementById('price').value;
  const age = document.getElementById('age').value;

  const carData = {
    title: title,
    brand: brand,
    price: price,
    age: parseInt(age),
  };

  try {
    const response = await fetch('http://localhost:3000/api/createCar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    const responseData = await response.json();
    const responseDiv = document.getElementById('response');
   // Após criar o carro com sucesso, exibir a mensagem formatada na div 'responseDiv'
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
  } catch (error) {
    console.error('Erro ao criar carro:', error);
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Ocorreu um erro ao criar o carro.';
  }

  clearForm(); // Limpar os campos do formulário após criar o carro com sucesso

}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("price").value = "";
  document.getElementById("age").value = "";
}
