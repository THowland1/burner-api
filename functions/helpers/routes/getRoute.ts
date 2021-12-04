import { routes } from '../airtable';
import formattedReturn from '../formattedReturn';
export default async (event, id) => {
  try {
    const routeData = await routes.find(id);
    return formattedReturn(200, routeData);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
