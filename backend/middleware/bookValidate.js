import book from "../models/book.js";

const existingBook = async (req, res, next) => {
  const title = await book.findOne({ name: "title" });
  if (!title)
    return res.status(500).send({ message: "This title is not available." });

  next();
};

export default { existingBook };
