app.post('/plans', async function(req, res){
    const plans = await models.Plan.findAll()
    res.send(JSON.stringify(plans))
})

app.post('/plans/:uuid', async function(req, res){
    try {
        const { name, tax, duration, inv_max, inv_min } = req.body
    }catch(err){
        res.status(400)
        res.send(err.toString())
    }
})