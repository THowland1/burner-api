const { routes } = require('../airtable');
const formattedReturn = require('../formattedReturn');
module.exports = async (event) => {
    try {
        const routesData = await routes.select().firstPage();
        const formattedRoutes = routesData.map((route) => ({
            id: route.id,
            ...route.fields,
        }));
        return formattedReturn(200, formattedRoutes);
    } catch (err) {
        console.error(err);
        return formattedReturn(500, {});
    }
};
