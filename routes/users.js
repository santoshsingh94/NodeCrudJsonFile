const userRoutes = (app, fs) => {
  // variables
  const dataPath = './data/users.json';

  //Refactor helper method
  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) throw err;
      callback(returnJson ? JSON.parse(data) : data);
    })
  }
  const writeFile = (fileData,callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.writeFile(filePath,fileData, encoding, (err) => {
      if (err) throw err;
      callback();
    })
  }

  // CREATE
  app.post('/users', (req, res) => {
    readFile(data => {
      const newUserId = Object.keys(data).length + 1;

      console.log((req.body));
      data[newUserId] = (req.body);
      console.log(data);
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send('new user added');
      });
    }, true);
  });

  // READ
  app.get('/users', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });
  // UPDATE
  app.put('/users/:id', (req, res) => {
    console.log(req.params['id']);
    readFile(data => {

      // add the new user
      const userId = req.params["id"];
      data[userId] = (req.body);

      writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`users id:${userId} updated`);
      });
  },
      true);
  });
  // DELETE
app.delete('/users/:id', (req, res) => {

  readFile(data => {

      // add the new user
      const userId = req.params["id"];
      delete data[userId];

      writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`users id:${userId} removed`);
      });
  },
      true);
});

};

module.exports = userRoutes;
