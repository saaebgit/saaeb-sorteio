import { API_URL } from "./conn.js";

	const hashCidade = window.location.hash.substring(1);
	const cidades = document.getElementById("cidades");
      let cidadesFormatada = "";

	switch(hashCidade) {
    case 'Altair':
      cidades.textContent = 'Sorteio Altair';
      cidadesFormatada = 'Altair';
      break;
    case 'Barretos':
      cidades.textContent = 'Sorteio Barretos';
      cidadesFormatada = 'Barretos';
      break;
	case 'Bebedouro':
      cidades.textContent = 'Sorteio Bebedouro';
      cidadesFormatada = 'Bebedouro';
      break;
	case 'Colina':
      cidades.textContent = 'Sorteio Colina';
      cidadesFormatada = 'Colina';
      break;
	case 'Colombia':
      cidades.textContent = 'Sorteio Colômbia';
      cidadesFormatada = 'Colômbia';
      break;
	case 'Guaira':
      cidades.textContent = 'Sorteio Guaíra';
      cidadesFormatada = 'Guaíra';
      break;
	case 'Guaraci':
      cidades.textContent = 'Sorteio Guaraci';
      cidadesFormatada = 'Guaraci';
      break;
	case 'Icem':
      cidades.textContent = 'Sorteio Icém';
      cidadesFormatada = "Icém";
      break;
	case 'Jaborandi':
      cidades.textContent = 'Sorteio Jaborandi';
      cidadesFormatada = 'Jaborandi';
      break;
	case 'Morro-Agudo':
      cidades.textContent = 'Sorteio Morro Agudo';
      cidadesFormatada = 'Morro Agudo';
      break;
	case 'Orlandia':
      cidades.textContent = 'Sorteio Orlândia';
      cidadesFormatada = 'Orlândia';
      break;
	case 'Terra-Roxa':
      cidades.textContent = 'Sorteio Terra Roxa';
      cidadesFormatada = 'Terra Roxa';
      break;
	case 'Viradouro':
      cidades.textContent = 'Sorteio Viradouro';
      cidadesFormatada = 'Viradouro';
      break;
    default:
      cidades.textContent = 'Sorteio sem Cidade';
	}
      console.log(cidadesFormatada);

document.getElementById('form').addEventListener("submit", async (event) => {
    event.preventDefault();
    //constantes forms
    const nome = document.getElementById("nome").value.trim();
    const numero = document.getElementById("numero").value;
	const email = document.getElementById("email").value;
	const numeroLimpo = numero.replace(/\D/g, "");

	if (!nome || numeroLimpo.length < 10) {
    alert("Por favor, preencha todos os campos corretamente!");
    return;
  	}
    try {
		const response = await fetch(`${API_URL}/usuarios/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({nome: nome, numero: numero, email: email, cidade: cidadesFormatada}),
		});
		if (response.status === 200 || response.status === 201) {
			const responseData = await response.json();
			alert("Você está participando do sorteio !!!");
			document.getElementById("form").style.display = "none";
    		document.getElementById("pin-view").style.display = "block";
   			document.getElementById("pin-code").innerText = responseData.pin;
    	}
		else if(response.status === 409)
			alert("Este telefone já foi cadastrado");
		else if(response.status === 500) 
			alert("Algo deu errado !!!");
    	else 
    	alert(response.status);
	
	} catch (error) {
		console.error("Erro ao enviar dados:", error);
		alert(error.message || "Ocorreu um erro durante o cadastro.");
	}
});

function numberFormat(value) {
  let maskedValue = value.replace(/\D/g, "").slice(0, 11);
  if (maskedValue.length === 10) {
    return maskedValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (maskedValue.length === 11) {
    return maskedValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return maskedValue;
}

document.getElementById("numero").addEventListener("input", (event) => {
  event.target.value = numberFormat(event.target.value);
});