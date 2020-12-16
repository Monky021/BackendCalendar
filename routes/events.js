const { Router } = require("express");
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos')
const {
  getEvetos,
  crearEventos,
  actualizarEventos,
  eliminarEventos,
  getOneEvento,
} = require("../controllers/eventsControllers");
const { validarJWT } = require("../middlewares/validar-jwt");
const {isDate} = require('../helpers/isDate');

const router = Router();
router.use(validarJWT);

// localhost:4000/api/events
router.get("/", getEvetos);

// localhost:4000/api/events
router.post(
  "/",
  [
      check("title", "El titulo es oblligatorio").not().isEmpty(),
      check("start", "Fecha de inicio es obligatoria").custom(isDate),
      check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
      validarCampos

  ],
  crearEventos
);

// localhost:4000/api/events/:id
router.put(
    "/:id",
    [
        check("title", "El titulo es oblligatorio").not().isEmpty(),
        check("start", "Fecha de inicio es obligatoria").custom(isDate),
        check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
        validarCampos
  
    ],
     actualizarEventos);

// localhost:4000/api/events/:id
router.delete("/:id", eliminarEventos);

// localhost:4000/api/events/:id
router.get("/:id", getOneEvento);

module.exports = router;
