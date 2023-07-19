const todoSchema = require("../model/todo");

const getTodo = async (req, res) => {

  try {
    const allTodos = await todoSchema.find({userId: req.params.userId});
    res.send(allTodos);
  } catch (err) {
    console.log(err);
  }
};

const getOneTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const oneTodo = await todoSchema.findOne({ _id: id });
    res.send(oneTodo);
  } catch (err) {
    console.log(err);
  }
};

const createTodo = async (req, res) => {
  const { todo, desc } = req.body;
  const userId = req.params.userId
  try {
    const newTodo = await todoSchema.create({
      userId: userId,
      todo: todo,
      desc: desc,
    });
    res.status(200).send("todo added successfully");
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (req, res) => {
  console.log(req.params.id);

  const { todo, desc } = req.body;
  try {
    const updatedTodo = await todoSchema.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: { todo: `${todo}`, desc: `${desc}` },
      }
    );
    res.send("updated given todo");
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTodo = await todoSchema.deleteOne({
      _id: id,
    });
    res.send("todo has been deleted");
  } catch (err) {
    console.log(err);
  }
};

const searchTodo = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await todoSchema.find({
      $or: [
        { todo: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  getOneTodo,
  searchTodo,
};
