const displayController = {
    displayHomePage: async (req, res) => {
        try {
            res.render('index');
        } catch (error) {
            console.error('Error in fetching category data:', error.message);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = displayController