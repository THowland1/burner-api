const { routes } = require('../airtable');
const formattedReturn = require('../formattedReturn');
module.exports = async (event) => {
    try {
        const { id } = JSON.parse(event.body);
        const routeData = await routes.find(id);
        return formattedReturn(200, routeData);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};
