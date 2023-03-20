const Work = require("../models/Work.model");
const UploadImg = require("./Image.Service");
const CreateWorkService = async (data, file) => {
  try {
    const url = await UploadImg(file);

    const work = new Work({
      title: data.title,
      description: data.description,
      image: url ? url : "",
    });

    if (work) {
      work.save();

      return {
        result: "success",
        work: work,
      };
    }

    return {
      result: "failed",
    };
  } catch (error) {
    return {
      result: "error",
      error: error,
    };
  }
};

const getWorkService = async () => {
  try {
    const listWork = await Work.find({});

    if (listWork)
      return {
        result: "success",
        work: listWork,
      };

    return {
      result: "failed",
      reason: "server error",
    };
  } catch (error) {
    return {
      result: "error",
      error: error,
    };
  }
};

const getWorkByIdService = async (id) => {
  try {
    const work = await Work.findById({ _id: id });
    if (work)
      return {
        result: "success",
        work: work,
      };

    return {
      result: "failed",
      reason: "work not found",
    };
  } catch (error) {
    return {
      result: "error",
      error: error,
    };
  }
};

const searchWorkService = async (data) => {
  try {
    const limitWork = parseInt(data.limit || "10");
    const q = data.q || ''
    const skip = ((data.page || 1) - 1) * limitWork;
    const work = await Work.find().limit(limitWork).skip(skip);
    if(work) return {
        result: 'success',
        work: work
    }

    return {
        result: 'failed',
        reason: "not found work"
    }
  } catch (error) {
    return {
        result: "error",
        error: error,
      };
  }
};

module.exports = {
  CreateWorkService,
  getWorkService,
  getWorkByIdService,
  searchWorkService,
};
