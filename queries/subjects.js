const db = require("../db/dbConfig");

const getAllSubjectsQuery = async () => {
    const query = 'SELECT * FROM subjects ORDER BY subject_name ASC';

    try {
        const result = await db.query(query);
        return result;
        
    } catch (error) {
        throw error;
    }
};

module.exports = { getAllSubjectsQuery };
