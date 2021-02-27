const models = require('../sequelize/models');
const express = require('express');
const  router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

router.post('/login', async function(req, res){
    const { username, password } = req.body

    try {
        if(!username || !password) throw Error('Favor de llenar todos los campos')

        let user = await models.User.findOne({ where: { username } })

        if(!user) throw Error('Usuario no encontrado')

        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            throw 'Contraseña no valida'
        }

        const token = jwt.sign({
            uuid: user.uuid,
            username: user.username
        }, process.env.HASH, { expiresIn: '1d' });

        res.send(JSON.stringify({ token, user }))
    }catch(err){
        res.status(401)
        res.send(err.toString())
    }
})

router.post('/register', async function(req, res){
    try {
        const { username, password } = req.body

        if(!username || !password) throw 'Favor de llenar todos los campos'

        const _isExistUser = await models.User.findOne({ where: { username } })
        if(_isExistUser){
            throw 'Este usuario ya existe'
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = models.User.build({
            uuid: uuidv4(),
            username,
            password: hashedPassword
        });

        await user.save();
        
        res.send(JSON.stringify(user))
    }catch(err){
        res.status(400)
        res.send(err.toString())
    }
})

module.exports = router;