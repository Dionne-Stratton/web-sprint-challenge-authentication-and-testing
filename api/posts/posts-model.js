const db = require("../../data/dbConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
};

function getAll() {
  return db("posts");
}

function getById(id) {
  return db("posts").where("id", id).first();
}

async function insert(post) {
  const [id] = await db("posts").insert(post);
  return db("posts").where({ id }).first();
}

async function update(id, changes) {
  return db("posts")
    .where("id", id)
    .update(changes)
    .then((count) => (count > 0 ? getAll(id) : null));
}

function remove(id) {
  return db("posts").where("id", id).del();
}
