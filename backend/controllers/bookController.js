import book from "../models/book.js"; //importo el modelo

const registerBook = async (req, res) => {
  const schema = new book({
    title: req.body.title,
    description: req.body.description,
    pager: req.body.pages,
    author: req.body.author,
    frontPageUrl: req.body.frontPageUrl,
    publicationDate: req.body.publicationDate,
    category: req.body.category,
  });

  let result = await schema.save();

  return !result
    ? res.status(500).send({ message: "Failed to register book" })
    : res.status(200).send({ result });
}; //Fin de la función registrar book

const listBook = async (req, res) => {
    let books = await book.find({
        $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: true }],
      });
    
      return books.length === 0
        ? res.status(404).send({ message: "No result search" })
        : res.status(200).send({ books });
}; //end listbook

export default { registerBook, listBook }; //exporto el modelo
