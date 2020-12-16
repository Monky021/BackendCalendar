const response = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response)=>{
    
    const { email, password} = req.body;
    try {

        let usuario = await Usuario.findOne({email});

        if (usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario existe con ese correo'
            })
        }
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        var salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save();
        //Generar token
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            msg: usuario.id,
            name: usuario.name,
            token
            
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el ADMIN'
        })
    }
}

const loginUsuario = async(req, res = response)=>{
    const { email, password} = req.body;
    try {
        const usuario = await Usuario.findOne({email});

        if (!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario y/o contraseña no son validos.'
            })
        }
        //confirmar los passwords
        const validPassword =bcrypt.compareSync(password, usuario.password)

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario y/o contraseña son invalidos.'
            })
        }
        //generar token
        const token = await generarJWT(usuario.id, usuario.name);



        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,  
            
        });
        

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el ADMIN'
        })
    }
    
} 

const revalidarToken =async (req, res = response)=>{

    const {name, uid} = req;
    //Generar newvo JWT
    const newToken = await generarJWT(uid, name)
    res.json({
        ok: true,
        newToken
    });
} 


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}