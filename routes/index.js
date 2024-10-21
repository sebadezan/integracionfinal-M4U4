var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', async (req, res, next) => {
  try {
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var dni = req.body.dni;
    var telefono = req.body.telefono;
    var email = req.body.email;

    var obj = {
      to: 'sebastiangust7@gmail.com', 
      subject: 'Datos de la página web', 
      html: `${nombre} ${apellido} se contactó y quiere unirse al gimnasio a través de este correo: ${email}. Este es su teléfono: ${telefono}`

    };


    let transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASS
      }
    });


    var info = await transporter.sendMail(obj);

    res.render('index', {
      message: 'Mensaje enviado correctamente',
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.render('index', {
      message: 'Hubo un error al enviar el mensaje, inténtalo de nuevo más tarde.',
    });
  }
});

module.exports = router;