const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(`mongodb://localhost:27017/testdb`);
};

const student = new mongoose.Schema({
  firstname: String,
  lastname: String
});

const Student = mongoose.model("student", student);

connect()
  .then(async c => {
    const student = await Student.create({ firstname: "chao", lastname: "ji" });
    console.log(student);
  })
  .catch(e => console.error(e));
