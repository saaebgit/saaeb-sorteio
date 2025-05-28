export default async function handler(req, res) {
  try {
    const response = await fetch('http://179.108.182.210:30001/usuarios/');
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    res.status(500).json({ error: 'Erro ao acessar a API' });
  }
}