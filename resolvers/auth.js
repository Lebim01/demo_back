app.post('/login', async function(req, res){
    const { username, password } = req.body

    try {
        if(!username || !password) throw Error('Favor de llenar todos los campos')

        let user = await models.User.findOne({ where: { username, password } })

        if(!user) throw Error('Usuario no encontrado')

        res.send(JSON.stringify(user))
    }catch(err){
        res.status(401)
        res.send(err.toString())
    }
})

app.post('/register', async function(req, res){
    try {
        const { username, password } = req.body

        if(!username || !password) throw 'Favor de llenar todos los campos'

        const _isExistUser = await models.User.findOne({ where: { email: username } })
        if(_isExistUser){
            throw 'Este usuario ya existe'
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = models.User.build({
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