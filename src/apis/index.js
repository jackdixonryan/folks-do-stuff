
module.exports = function runApp(app, port) {
  app.listen(port, () => {
    console.log("APP listening on ", port);
  });
}