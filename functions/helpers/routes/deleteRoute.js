const { routes } = require('../airtable');
const formattedReturn = require('../formattedReturn');
module.exports = async (event) => {
    const { id } = JSON.parse(event.body);
    try {
        const deletedRoute = await routes.destroy(id);
        return formattedReturn(200, deletedRoute);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};
