const auth = require("../services/api/token.service");

module.exports = async function authenticate(req, res, next) {
  const { headers } = req;
  const { authorization } = headers;
  if (!authorization) {
    res.status(401).send({
      error: {
        code: "NO_AUTH_HEADER",
        message: "The Authorization header is required for this call.",
        link: ""
      }
    });
  } else {
    const token = authorization.split(" ")[1];
    if (!token) {
      res.status(401).send({
        error: {
          code: "INVALID_AUTH_HEADER",
          message: "The Authorization header is malformed. Ensure you are using bearer authentication with a valid JWT.",
          link: ""
        }
      });
    } else {
      try { 
        const evaluation = auth.validateToken(token, "the_gauls_are_coming");
        next();
      } catch(error) {
        res.status(401).send({
          code: "INVALID_TOKEN",
          message: error.message,
          link: "",
        });
      }
    }
  }
}