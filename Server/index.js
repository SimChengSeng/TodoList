const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const TodoModel = require('./models/Todo.js');
const UserModel = require('./models/User.js');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

//get all
app.get('/get',(req,res) => {
  const {ownerId} = req.query;
  
  TodoModel.find({owner:ownerId})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

//update done status
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

//update todo
app.put('/updateTodo/:id', (req, res) => {
    const { id } = req.params;
    const {task} = req.body;

    TodoModel.findByIdAndUpdate(id,{task},{new: true})
        .then(updatedTodo => res.json(updatedTodo))
        .catch(err => res.status(500).json(err));
});

//delete todo
app.delete('/delete/:id',(req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

//add todo
app.post('/add',(req,res) => {
    const {task,owner} = req.body;
   
    TodoModel.create({
        task: task,
        owner: owner
    
    }).then(result => res.json(result))
    .catch(err => res.json(err));
})

//delete user
app.delete('/deleteUser/:id', (req, res) => {
  const { id } = req.params;
  UserModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

//Search

app.get('/search', (req,res) => {
  const {ownerId} = req.query;
  const {searchTask} = req.query;

  console.log('Received searchTask:', searchTask); 

  TodoModel.find({ owner: ownerId, task: new RegExp(searchTask, 'i') })
  .then(result => res.json(result))
  .catch(err => res.json(err));
})

// Login and SingUP
app.post("/login", async (req, res) => {
    const {username,password} = req.body;
  
    try {
      const user = await UserModel.findOne({ username, password });
      console.log("---user---");
      console.log(user._id);
      if (user) {
        res.json(user);
      } else {
        res.json("notExist");
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json("error");
    }
  });
  
  app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        res.json("exist");
      } else {
        const newUser = new UserModel({ username, password });
         res.json("notExist");
         await newUser.save();
       
      }
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json("error");
    }
  });

  app.get('/users-todos', async (req, res) => {
    try {
      const users = await UserModel.find({});  // Fetch all users
      const usersWithTodos = await Promise.all(users.map(async user => {
        const todos = await TodoModel.find({ owner: user._id });  // Fetch todos for each user
        return { ...user.toObject(), todos };  // Combine user data with their todos
      }));
   
      res.json(usersWithTodos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users and todos' });
    }
  });
  
  
  

app.listen(3001,() => {
    console.log("Server is Running ");
})