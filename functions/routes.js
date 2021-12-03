const formattedReturn = require('./helpers/formattedReturn');
const getRoutes = require('./helpers/routes/getRoutes');
const createRoute = require('./helpers/routes/createRoute');
const deleteRoute = require('./helpers/routes/deleteRoute');
const updateRoute = require('./helpers/routes/updateRoute');
exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        return await getRoutes(event);
    } else if (event.httpMethod === 'POST') {
        return await createRoute(event);
    } else if (event.httpMethod === 'PUT') {
        return await updateRoute(event);
    } else if (event.httpMethod === 'DELETE') {
        return await deleteRoute(event);
    } else {
        return formattedReturn(405, {});
    }
};
