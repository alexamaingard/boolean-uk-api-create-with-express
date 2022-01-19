const res = require("express/lib/response");
const Book = require("./model");

const createOne = async (req, res) => {
  const bookToCreate = {
    ...req.body
  };

  const createABook = Book().createOneBook;
  const thisRes = await createABook(bookToCreate.name, res);
  return res.json({ data: thisRes });
}

const getAll = async (req, res) => {
  const all = Book().getAll;
  const thisRes = await all(res);
  return res.json({ data: thisRes });
}

const getOneById = async (req, res) => {
  const idToGet = req.params.id;

  const one = Book().getOneById;
  const thisRes = await one(idToGet);
  return res.json({ data: thisRes });
}

module.exports = {
  createOne,
  getAll,
  getOneById
}