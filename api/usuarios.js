export default async function handler(req, res) {
  const apiUrl = 'http://179.108.182.210:30001/usuarios/';

  try {
    const method = req.method;

    let apiResponse;

    if (method === 'GET') {

      apiResponse = await fetch(apiUrl);
    } else if (method === 'POST') {

      apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
    } else {
      res.status(405).json({ error: 'Método não permitido' });
      return;
    }

    const data = await apiResponse.json();
    res.status(apiResponse.status).json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    res.status(500).json({ error: 'Erro ao acessar a API' });
  }
}
