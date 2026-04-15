
//middleware observador
const logger = (req, res, next) => {
    console.log(`Requisição recebida: ${req.method} ${req.url}`);
    next();
  }
  
  export default logger