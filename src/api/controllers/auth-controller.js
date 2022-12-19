const AuthServices = require("../services/auth-services");
const bcrypt = require('bcryptjs');


// Verifica os dados e retorna um token
const doLogin = async (req, res) => {
    const {login, senha} = req.body; 

    if(!login || !senha){
        return res.status(404).send({message:"Insira todos os campos"})
    }

    try{
        const user = await AuthServices.getUserLogin(login)
        
        if(!user){
            return res.status(404).send({message:"Usuário Invalido"})
        }

        const senhaIsValid = bcrypt.compareSync(senha, user.senha);

        if(!senhaIsValid){
            return res.status(400).send({message: "Senha ou Usuário Invalido"});
        }

        const token = AuthServices.GenerateToken(user.id, user.ImgPerfil, user.client_id, user.nome, user.sobrenome, user.email, user.AdmAccess, user.ActiveFarms)
        
        return res.send({token});
        
    }
    catch (err) {
        res.status(500).send({error: err.message})
    }
}

// Verifica o Token recebido no sistema
const VerifyLogin = async (req, res) => {
    const { token } = req.body;
    if (!token){
        return res.status(404).send({message: 'invalid signature'})
    }

    try{
        AuthServices.VerifyLogin(token);

        return res.status(200).send({message: 'valid'})

    } catch (err) {
        return res.status(404).send({message: err.message})
    }
}

module.exports = {
    doLogin,
    VerifyLogin,
}