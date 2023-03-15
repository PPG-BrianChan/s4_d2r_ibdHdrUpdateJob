module.exports = processData;
const cds = require('@sap/cds')

async function processData(dataSet) {
    console.log(`---Being of Data Processing---`)
    var processResult = [];
    for (let i = 1; i < dataSet.length; i++) {
        let doUpdate = true;
        const deliveryDocument = dataSet[i];
        for (let j = 0; j < deliveryDocument.to_DeliveryDocumentItem.length; j++) {
            const item = deliveryDocument.to_DeliveryDocumentItem[j];
            if (item.GoodsMovementStatus !== 'C') {
                doUpdate = false;
                break;
            }
        }
        if (doUpdate) {
            result = await _executeUpdate(deliveryDocument.DeliveryDocument);
            processResult.push(result);
        }
    }
    console.log(`---End of Data Processing---`)
    return processResult;
}

const _executeUpdate = async function (deliveryDocument) {
    console.log(`Creating job for document:${deliveryDocument}`)
    var returnData = {
        deliveryDocument: deliveryDocument,
        status: ''
    }
    try {

        const conn = await cds.connect.to('ZAPI_IBDHDRCLEANUPJOB_O2');
        const postResult = await conn.send(
            { method: 'POST', path: `/CreateJob?Delivery='${deliveryDocument}'&$format=json` }
        )
        console.log('POST performed successfully')
        returnData.status = 'Success';
    } catch (error) {
        if (error.response.data) {
            console.log('Error during axios call:', error.response.data)
            returnData.status = `Error:${error.response.data}`
        } else {
            console.log('Error during axios call:', error.message)
            returnData.status = `Error:${error.message}`
        }
    }
    return returnData;
}