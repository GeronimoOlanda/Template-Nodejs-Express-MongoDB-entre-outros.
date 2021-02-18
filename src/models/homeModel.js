const mongoose = require('mongoose');

//trabalhando com esquemas(regras de negocios)
//estamos fazendo do jeito que queremos que esteja na base de dados
const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: String,
    
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home{

}

module.exports = Home;