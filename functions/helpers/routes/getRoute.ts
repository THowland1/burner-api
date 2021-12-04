import { routes } from '../airtable';
import formattedReturn from '../formattedReturn';
export default async (event, id) => {
  try {
    const routeData = await routes.find(id);
    const data: Array<unknown> = JSON.parse(routeData.fields.raw);
    return formattedReturn(200, data);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
