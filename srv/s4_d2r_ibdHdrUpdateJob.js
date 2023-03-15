const retrieveData = require('./libs/retrieveData.js')
const processData = require('./libs/processData.js')
const processReqHeader = require('./libs/processReqHeader')
const updateScheduler = require('./libs/updateScheduler.js')

module.exports = (srv) => {
    srv.on('scheduledCleanUp', async (req) => {
        const isJob = await processReqHeader(req);
        const dataSet = await retrieveData();
        result = await processData(dataSet);
        if (isJob) {
        await updateScheduler(result, req.headers)
        } else {
            return result;
        }
    })
}