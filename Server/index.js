const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const TodoModel = require('./models/Todo.js');
const UserModel = require('./models/User.js');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/get',(req,res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findById(id)
        .then(todo => {
            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            } 
            todo.done = !todo.done;
            return todo.save();
        })
        .then(updatedTodo => res.json(updatedTodo))
        .catch(err => res.status(500).json(err));
});

app.put('/updateTodo/:id', (req, res) => {
    const { id } = req.params;
    const {task} = req.body;

    TodoModel.findByIdAndUpdate(id,{task},{new: true})
        .then(updatedTodo => res.json(updatedTodo))
        .catch(err => res.status(500).json(err));
});

app.delete('/delete/:id',(req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.post('/add',(req,res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err));
})

// Login and SingUP
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email, password });
      if (user) {
        res.json("exist");
      } else {
        res.json("notExist");
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json("error");
    }
  });
  
  app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.json("exist");
      } else {
        const newUser = new UserModel({ email, password });
        await newUser.save();
        res.json("notExist");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json("error");
    }
  });
  
  

app.listen(3001,() => {
    console.log("Server is Running ");
})