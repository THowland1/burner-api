const { routes } = require('../airtable');
const formattedReturn = require('../formattedReturn');
module.exports = async (event) => {
    const { id, ...fields } = JSON.parse(event.body);
    try {
        const updatedRoute = await routes.update([{ id, fields }]);
        return formattedReturn(200, updatedRoute);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};
