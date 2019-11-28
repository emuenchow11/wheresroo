import { getEntries, addNewEntry, getEntryWithId } from "../controllers/rooController";
import { uploadFile } from '../upload';

const routes = (app) => {
    app.route('/entries')
        .get(getEntries)
        .post(addNewEntry);

    app.route('/entries/:entryId')
        .get(getEntryWithId);

    app.route('/pictures')
        .post(uploadFile)
}

export default routes;