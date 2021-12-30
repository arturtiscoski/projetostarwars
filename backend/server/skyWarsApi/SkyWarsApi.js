async function get(req, res) {
  try {
    console.log('Teste get api')
    req.status(200).json({ resposta: 'teste' });
  } catch (error) {
    if (typeof error === 'object')
      res.status(404).json({ message: error.message });
    else
      res.status(404).json({ message: error })
  }
}

module.exports = { get }