const { Sequelize } = require("sequelize");
const db = require("../models")
const Patients = db.Patients;
const Op = Sequelize.Op;

const store = async (req, res) => {
    try {
        const save = await Patients.create(req.body)
        res.json(save).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const index = async (req, res) => {
    try {
        const result = await Patients.findAll()
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const show = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Patients.findByPk(id)
        const result = data ? data : `Patient with this certain id:${id} is not found in database.`
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const update = (req, res) => {
    Patients
        .findByPk(req.params.id)
        .then((emp) => {
            if (emp) {
                emp.update(req.body)
                msg = emp
            } else {
                msg = `Patient with this certain id:${req.params.id} is not found in database.`
            }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ msg: err.message });
    });
}

const destroy = (req, res) => {
    let msg
    Patients
        .findByPk(req.params.id)
        .then((row) => {
            if(row) {
                row.destroy()
                msg = "Deleted successfully."
            } else {
                msg = `Patient with this certain id:${req.params.id} is not found in database.`
            }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ message: err.message })
    })
}

const search = async (req, res) => {
    const patients = await Patients.findAll({
        where: {
            name: { [Op.like]: `%${req.params.name}%` },
          }
    }).catch((err) => {
        res.json({ message: err.message })
    })

    res.json(patients).status(200);
}

const positive = async (req, res) => {
    const patients = await Patients.findAll({
        where: {
           status: 1 
        }
    }).catch((err) => {
        res.json({ message: err.message })
    })

    res.json(patients).status(200);
}

const death = async (req, res) => {
    const patients = await Patients.findAll({
        where: {
           status: 0
        }
    }).catch((err) => {
        res.json({ message: err.message })
    })

    res.json(patients).status(200);
}

const recovered = async (req, res) => {
    const patients = await Patients.findAll({
        where: {
           status: 3
        }
    }).catch((err) => {
        res.json({ message: err.message })
    })

    res.json(patients).status(200);
}

module.exports = {
    index, show, store, update, destroy, search, positive, recovered, death
}
