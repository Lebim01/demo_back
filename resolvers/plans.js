const models = require('../sequelize/models');
const express = require('express');
const  router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')

const round = (val) => {
    return Math.round(val * 100) / 100
}

router.get('/', async function(req, res){
    try {
        if(!req.isAuth) throw 'Petición invalida'

        const plans = await models.Plan.findAll()
        res.send(JSON.stringify(plans))
    }catch(err){
        res.status(401)
        res.send(err.toString())
    }
})

router.get('/:uuid', async function(req, res){
    try {
        if(!req.isAuth) throw 'Petición invalida'
        
        const { uuid } = req.params

        const plan = await models.Plan.findOne({ where: { uuid } })

        if(!plan) throw 'Plan no encontrado'

        res.send(JSON.stringify(plan))
    }
    catch(err){
        res.status(401)
        res.send(err.toString())
    }
})

router.post('/', async function(req, res){
    try {
        if(!req.isAuth) throw 'Petición invalida'

        const { name, tax, duration, inv_max, inv_min } = req.body

        if(!name || !tax || !duration || !inv_max || !inv_min) throw 'Favor de llenar los campos'
        if(Number(inv_max) < Number(inv_min)) throw 'La inversión máxima debe ser mayor a la mínima'
        if(!Number(duration) > 0) throw 'La duración debe ser mayor a 0'
        if(!Number(tax) > 0) throw 'El interés debe ser mayor a 0'

        const plan = models.Plan.build({
            uuid: uuidv4(),
            name,
            tax,
            duration,
            inv_max,
            inv_min
        })

        await plan.save();

        res.send(JSON.stringify(plan))
    }catch(err){
        res.status(401)
        res.send(err.toString())
    }
})

router.post('/:uuid', async function(req, res){
    try {
        if(!req.isAuth) throw 'Petición invalida'

        const { uuid } = req.params
        const { name, tax, duration, inv_max, inv_min } = req.body

        if(!name || !tax || !duration || !inv_max || !inv_min) throw 'Favor de llenar los campos'

        const plan = await models.Plan.findOne({ where: { uuid } })

        if(!plan) throw 'Plan no encontrado'

        plan.name = name
        plan.tax = tax
        plan.duration = duration
        plan.inv_max = inv_max
        plan.inv_min = inv_min

        await plan.save();

        res.send(JSON.stringify(plan))
    }catch(err){
        res.status(401)
        res.send(err.toString())
    }
})

router.delete('/:uuid', async function(req, res){
    try {
        if(!req.isAuth) throw 'Petición invalida'

        const { uuid } = req.params

        const plan = await models.Plan.findOne({ where: { uuid } })

        if(!plan) throw 'Plan no encontrado'

        await plan.destroy()

        res.send("Eliminado")
    }catch(err){
        res.status(401)
        res.send(err.toString())
    }
})

router.post('/:uuid/report', async function(req, res){
    try {
        if(!req.isAuth) throw 'Petición invalida'

        const { uuid } = req.params
        const { init_date, amount } = req.body

        const plan = await models.Plan.findOne({ where: { uuid } })

        if(!plan) throw 'Plan no encontrado'

        let _result = []
        let _amount = Number(amount)
        let _date = moment(init_date)

        for(let i = 1; i < Number(plan.duration); i++){
            const performance = round(_amount * (Number(plan.tax) / 100))
            _result.push({
                name: i === 1
                    ? plan.name
                    : '',
                date: _date.format("YYYY/MM/DD"),
                tax: `${plan.tax}%`,
                init_amount: _amount,
                performance
            })
            _amount = round(_amount + performance)
            _date = _date.add(1, 'month')
        }

        _result.push({
            name: 'TOTAL, FINAL',
            date: _date.format("YYYY/MM/DD"),
            tax: `${plan.tax}%`,
            init_amount: _amount,
        })

        res.send(JSON.stringify(_result))
    }catch(err){
        res.status(401)
        res.send(err.toString())
    }
})

module.exports = router