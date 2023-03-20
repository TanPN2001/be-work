const Work = require("../../models/Work.model");
const {
  CreateWorkService,
  getWorkService,
  getWorkByIdService,
  searchWorkService,
} = require("../../services/Work.Service");

const CreateWork = async (req, res) => {
  const { title, description } = req.body;
  const result = await CreateWorkService({ title, description }, req.file);
  if (result) return res.send(result);
  return res.send({
    result: "failed",
  });
};

const getWork = async (req, res) => {
  const result = await getWorkService();
  if (result) return res.send(result);
  return res.send({
    result: "failed",
  });
};

const getWorkById = async (req, res) => {
  const { id } = req.query;
  if (id) {
    const result = await getWorkByIdService(id);
    return res.status(200).send(result);
  }

  return res.status(400).send({
    result: "failed",
    reason: "check id query against",
  });
};

const searchWork = async (req, res) => {
  const { q, limit, page } = req.query;
  const result = await searchWorkService({ q, limit, page });

  if (result) {
    return res.status(200).send(result);
  }

  return {
    result: "failed",
    reason: "server error",
  };
};

module.exports = { CreateWork, getWork, getWorkById, searchWork };
