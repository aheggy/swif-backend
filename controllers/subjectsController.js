const { getAllSubjectsQuery } = require("../queries/subjects");

const subjectsController = {
    getAllSubjects: async (req, res) => {
        try {
            const allSubjects = await getAllSubjectsQuery();
            res.status(200).json(allSubjects); // Sending a successful response
        } catch (error) {
            console.log("Error fetching subjects:", error);
            res.status(500).json({ error: "Internal Server Error" }); // Sending an error response
        }
    }
};

module.exports = subjectsController;
