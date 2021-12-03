const { routes } = require('../airtable');
const formattedReturn = require('../formattedReturn');
module.exports = async (event) => {
    const fields = JSON.parse(event.body);
    try {
        const createdRoute = await routes.create([{ fields }]);
        return formattedReturn(200, createdRoute);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};
