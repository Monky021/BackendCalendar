const response = require('express');
const Evento =require('../models/Evento');

const getEvetos = async(req, res=response) => {
    
    const eventos = await Evento.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        eventos
    })
}
const crearEventos = async(req, res=response) => {
    const evento = new Evento(req.body)
    try {
        evento.user = req.uid;
        const eventoSave = await evento.save();
        res.json({
            ok:true,
            evento: eventoSave
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el ADMIN'
        })
    }

    
} 
const actualizarEventos = async(req, res=response) => {
    
    const eventoId = req.params.id;
    const uid= req.uid;
    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg:'evento no existe'
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privegios para editar este evento'
            })
        }
        const nuevoEvento = {
            ...req.body,
            user:uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento, {new: true});

        res.json({
            ok:true,
            evento: eventoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el ADMIN'
        })
    }
    
} 

const eliminarEventos = async(req, res=response) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg:'evento no existe'
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privegios para eliminar este evento'
            })
        }
        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok:true
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Pongas en contacto con el ADMIN'
        })
    }

    
} 

const getOneEvento = (req, res=response) => {
    


    res.status(200).json({
        ok: true,
        msg: 'getOneEventos'
    })
} 
module.exports = {
    getEvetos,
    crearEventos,
    actualizarEventos,
    getOneEvento,
    eliminarEventos
}