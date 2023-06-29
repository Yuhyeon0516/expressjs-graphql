const commentModel = require("./comments.model");

module.exports = {
  Query: {
    comments: () => {
      return commentModel.getAllComments();
    },
  },
};
