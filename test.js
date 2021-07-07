const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(`mongodb://localhost:27017/testdb`);
};

const student = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    unique: true
  },
  lastname: {
    type: String,
    required: true,
    unique: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "group"
  }
});

const group = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Group = mongoose.model("group", group);
const Student = mongoose.model("student", student);

connect()
  .then(async c => {
    const group = await Group.create({ name: "basketball" });
    const student = await Student.create({
      firstname: "chao",
      lastname: "ji",
      group: group._id
    });
    const match = await Student.findById(student.id)
      .populate("group")
      .exec();
    console.log(match);
  })
  .catch(e => console.error(e));
