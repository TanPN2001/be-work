const { CreateWorkService } = require("../../services/Work.Service");

const CreateWork = async (req, res) => {
  const { title, description } = req.body;
  const result = CreateWorkService({ title, description }, req.file);

  if(result) return res.send(result)
  return res.send({
    result: 'failed'
  })
};

module.exports = { CreateWork };
