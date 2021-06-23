// Rutas.
// Conexion con bd.
const connection = require("../../config/connectiondb.js");
const bcryptjs = require("bcryptjs");

// Rutas.
module.exports = (app) => {
  // Solitudes GET
  app.get("/", (req, res) => {
    if (req.session.loggedin) {
      res.render("index.ejs", {
        // Enviar parametros
        user: req.session.user,
        rol: req.session.rol,
        login: true,
      });
    } else {
      res.render("index.ejs", {
        user: req.session.user,
        rol: req.session.rol,
        login: false,
      });
    }
  });

  app.get("/login", (req, res) => {
    if (req.session.loggedin) {
      res.render("login.ejs", {
        // Enviar parametros
        user: req.session.user,
        rol: req.session.rol,
        login: true,
      });
    } else {
      res.render("login.ejs", {
        user: req.session.user,
        rol: req.session.rol,
        login: false,
      });
    }
  });

  app.get("/perfil", (req, res) => {
    if (req.session.loggedin) {
      res.render("perfil.ejs", {
        // Enviar parametros
        user: req.session.user,
        rol: req.session.rol,
        login: true,
      });
    } else {
      res.render("perfil.ejs", {
        user: req.session.user,
        rol: req.session.rol,
        login: false,
      });
    }
  });

  app.get("/registro", (req, res) => {
    if (req.session.loggedin) {
      res.render("registro.ejs", {
        // Enviar parametros
        user: req.session.user,
        rol: req.session.rol,
        login: true,
      });
    } else {
      res.render("registro.ejs", {
        user: req.session.user,
        rol: req.session.rol,
        login: false,
      });
    }
  });

  app.get("/sorteos", (req, res) => {
    if (req.session.loggedin) {
      res.render("sorteos.ejs", {
        // Enviar parametros
        user: req.session.user,
        rol: req.session.rol,
        login: true,
      });
    } else {
      res.render("sorteos.ejs", {
        user: req.session.user,
        rol: req.session.rol,
        login: false,
      });
    }
  });

  app.get("/resultados", (req, res) => {
    if (req.session.loggedin) {
      res.render("resultados.ejs", {
        // Enviar parametros
        user: req.session.user,
        rol: req.session.rol,
        login: true,
      });
    } else {
      res.render("resultados.ejs", {
        user: req.session.user,
        rol: req.session.rol,
        login: false,
      });
    }
  });

  app.get("/eventos", (req, res) => {
    if (req.session.loggedin) {
      res.render("eventos.ejs", {
        // Enviar parametros
        user: req.session.user,
        rol: req.session.rol,
        login: true,
      });
    } else {
      res.render("eventos.ejs", {
        user: req.session.user,
        rol: req.session.rol,
        login: false,
      });
    }
  });

  app.get("/terminos_condiciones", (req, res) => {
    if (req.session.loggedin) {
      res.render("./terminos_condiciones.ejs", {
        // Enviar parametros
        user: req.session.user,
        login: true,
      });
    } else {
      res.render("./terminos_condiciones.ejs", {
        user: req.session.user,
        login: false,
      });
    }
  });

  app.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });

  app.get("*", function (req, res) {
    if (req.session.loggedin) {
      res.render("./404.ejs", {
        // Enviar parametros
        user: req.session.user,
        login: true,
      });
    } else {
      res.render("./404.ejs", {
        user: req.session.user,
        login: false,
      });
    }
  });

  app.get("/500", function (req, res) {
    res.render("./500.ejs");
  });

  // Logeado
  app.post("/login", async (req, res) => {
    const { email, passw } = req.body;
    console.log(req.body);
    connection.query(
      "SELECT * FROM db_cliente WHERE email = ? ",
      [email],
      async (err, result) => {
        if (
          result.length === 0 ||
          !(await bcryptjs.compare(passw, result[0].passw))
        ) {
          res.render("login.ejs", {
            login: false,
            alert: true,
            alertTitle: "Invalido",
            alertMessage: "Usuario y/o Contraseña Inconrrectas",
            alertIcon: "error",
            showConfirmButton: false,
            timer: false,
            ruta: "login",
          });
        } else {
          req.session.loggedin = true;
          req.session.user = result[0].user;
          req.session.rol = result[0].rol;
          res.redirect("/");
        }
      }
    );
  });

  // Registro
  app.post("/registro", async (req, res) => {
    const { foto_perfil, user, lastname, addre, telefono, email, passw } =
      req.body;
    console.log(req.body);
    let passHaash = await bcryptjs.hash(passw, 8);
    connection.query(
      "INSERT INTO db_cliente SET ?",
      {
        foto_perfil: "",
        user: user,
        lastname: lastname,
        addre: addre,
        telefono: telefono,
        email: email,
        passw: passHaash,
        rol: "usuario",
      },
      async (error, results) => {
        if (error) {
          console.log("Que error tengo" + error);
        } else {
          res.render("registro.ejs", {
            login: false,
            alert: true,
            alertTitle: "Registrar",
            alertMessage: "Registro exitoso",
            alertIcon: "success",
            showConfirmButton: false,
            timer: false,
            ruta: "administrador",
          });
        }
      }
    );
  });

  // Inicio
  app.post("/", async (req, res) => {
    const { user, email, telefono, addre, asunto, argumento } = req.body;
    console.log(req.body);
    let login = req.session.isloggedin ? true : false;
    connection.query(
      "INSERT INTO db_asunto SET ?",
      {
        user: user,
        email: email,
        telefono: telefono,
        addre: addre,
        asunto: asunto,
        argumento: argumento,
      },
      async (error, results) => {
        if (error) {
          console.log("Que error tengo" + error);
        } else {
          res.render("index.ejs", {
            login,
            alert: true,
            alertTitle: "Enviado",
            alertMessage: "¡Te estaremos contactando!",
            alertIcon: "success",
            showConfirmButton: false,
            timer: false,
            ruta: "/",
          });
        }
      }
    );
  });

  // Sorteo
  app.post("sorteos", (req, res) => {
    connection.query("SELECT * FROM db_sorteos", (error, results) => {
        if (error) {
          console.log("Que error tengo" + error);
        } else {
          res.render("sorteos.ejs", {
            results:results,
          });
        }
      })
  });

  // 
};
