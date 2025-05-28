export default async function handler(req, res) {
  const apiUrl = 'http://179.108.182.210:30001/usuarios/';

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido. Use POST.' });
    return;
  }

  try {
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    const data = await apiResponse.json();
    res.status(apiResponse.status).json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    res.status(500).json({ error: 'Erro ao acessar a API' });
  }
}
