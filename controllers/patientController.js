const { Sequelize } = require("sequelize");
const db = require("../models");
const Patients = db.Patients;
const Op = Sequelize.Op;

const store = async (req, res) => {
  try {
    const save = await Patients.create(req.body);

    res.json({
        message: `Resource is added successfully.`,
        data: save
    }).status(201);
  } catch (error) {
    res.json({
        message: `All fields must be filled correctly.`
    }).status(422);
  }
};

const index = async (req, res) => {
  try {
    const data = await Patients.findAll();
    const result = {
      message: `Get All Resource`,
      data: data,
    };

    res.json(result).status(200);
  } catch (error) {
    const result = {
        message: `Data is empty`
      };
  
      res.json(result).status(200);
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Patients.findByPk(id);
    if (data != null) {
        res.json({
            message: `Get detail resource`,
            data: data
        })
    }

    res.json({
        message: `Resource not found`
    }).status(404);
  } catch (error) {
    res.json(error).status(422);
  }
};

const update = (req, res) => {
    console.log(req.body)
  Patients.findByPk(req.params.id)
    .then((emp) => {
      if (emp) {
        emp.update(req.body);
      } else {
        res.json({
            message: `Resource not found`
        }).status(404);
      }

      res.json({
        message: `Resource is updated successfully`,
        data: emp
      }).status(200);
    })
    .catch((err) => {
      res.json({ message: err.message }).status(422);
    });
};

const destroy = (req, res) => {
  Patients.findByPk(req.params.id)
    .then((row) => {
      if (row) {
        row.destroy();
      } else {
        res.json({
            message: `Resource not found`
        }).status(404);
      }

      res.json({ message: `Resource is deleted successfully` }).status(200);
    })
    .catch((err) => {
      res.json({ message: err.message }).status(422);
    });
};

const search = async (req, res) => {
  const patients = await Patients.findAll({
    where: {
      name: { [Op.like]: `%${req.params.name}%` },
    },
  }).catch((err) => {
    res.json({ message: err.message }).status(500);
  });

  res.json({
    message: `Get searched resource`,
    data: patients
  }).status(200);
};

const positive = async (req, res) => {
  const patients = await Patients.findAll({
    where: {
      status: 1,
    },
  }).catch((err) => {
    res.json({ message: err.message }).status(500);
  });
  const totalPatients = await Patients.count({
    where: {
        status: 1,
      },
    })
    .catch((err) => {
      res.json({ message: err.message }).status(500);
    })

  res.json({
    message: `Get positive resource`,
    total: totalPatients,
    data: patients
  }
  ).status(200);
};

const death = async (req, res) => {
  const patients = await Patients.findAll({
    where: {
      status: 0,
    },
  }).catch((err) => {
    res.json({ message: err.message }).status(500);
  });
  const totalPatients = await Patients.count({
    where: {
      status: 0,
    },
  }).catch((err) => {
    res.json({ message: err.message }).status(500);
  })

  res.json({
    message: `Get death resource`,
    total: totalPatients,
    data: patients
  }).status(200);
};

const recovered = async (req, res) => {
  const patients = await Patients.findAll({
    where: {
      status: 3,
    },
  }).catch((err) => {
    res.json({ message: err.message }).status(500);
  });
  const totalPatients = await Patients.count({
    where: {
      status: 3,
    },
  }).catch((err) => {
    res.json({ message: err.message }).status(500);
  })

  res.json({
    message: `Get recovered resource`,
    total: totalPatients,
    data: patients
  }).status(200);
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  search,
  positive,
  recovered,
  death
};
