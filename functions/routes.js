const formattedReturn = require('./helpers/formattedReturn');
const getRoutes = require('./helpers/routes/getRoutes');
const createRoute = require('./helpers/routes/createRoute');
const deleteRoute = require('./helpers/routes/deleteRoute');
const updateRoute = require('./helpers/routes/updateRoute');
const getRoute = require('./helpers/routes/getRoute');
exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        const pathSegments = event.path.split('/');
        const lastPathSegment = pathSegments[pathSegments.length - 1];
        if (lastPathSegment.includes('rec')) {

            return await getRoute(event);
        } else {

            return await getRoutes(event);
        }
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
