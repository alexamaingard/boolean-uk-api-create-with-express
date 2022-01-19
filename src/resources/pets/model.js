const db = require("../../utils/database");
const { buildAnimalDatabase } = require("../../utils/mockData");

function Pet() {
  function createTable() {
    const sql = `
      DROP TABLE IF EXISTS pets;

      CREATE TABLE IF NOT EXISTS pets (
        id        SERIAL        PRIMARY KEY,
        name      VARCHAR(255)   NOT NULL,
        age       INTEGER       NOT NULL,
        type      VARCHAR(255)   NOT NULL,
        breed     VARCHAR(255)   NOT NULL,
        microchip BOOLEAN       NOT NULL
      );
    `;

    return db
      .query(sql)
      .then((result) => console.log("[DB] Pet table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createPet = `
      INSERT INTO pets
        (name, age, type, breed, microchip)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const pets = buildAnimalDatabase();

    pets.forEach((pet) => {
      db.query(createPet, Object.values(pet));
    });
  }

  const createOnePet = (pet) => {
    const createOne = `
      INSERT INTO pets (pet)
      VALUES ($1)
      RETURNING *;
    `;

    return db
      .query(createOne, [pet])
      .then((result) => result.rows[0])
      .catch(console.error);
  }

  const getAll = (res) => {
    const getAll = `
      SELECT *
        FROM pets;
    `;
  
    return db 
      .query(getAll)
      .then((result) => result.rows)
      .catch(console.error);
    }

  const getOneById = (id, res) => {
    const getOneById = `
      SELECT * 
      FROM pets
      WHERE id = $1;
    `;

    return db
      .query(getOneById, [id])
      .then((result) => result.rows[0])
      .catch(console.error);
  }

  const init = () => {
    createTable().then(() => {
      console.log("\nCreating mock data for Pets...\n");
  
      mockData();
    });
  }

  return {
    createOnePet,
    getOneById,
    getAll,
    init
  };
}

module.exports = Pet;
