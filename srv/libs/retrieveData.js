module.exports = retrieveData;
const cds = require('@sap/cds')

async function retrieveData () {
    console.log('---Retrieving data---')
    try {
        const conn = await cds.connect.to('OP_API_INBOUND_DELIVERY_SRV_0002');
        const query = SELECT.from({ ref: ['jobService.s4InbDeliveryHeader'] })
            .columns(['*', { ref: ['to_DeliveryDocumentItem'], expand: ['*'] }])
            .where([{ ref: ['OverallGoodsMovementStatus'] }, '=', { val: 'B' }])
            .orderBy([{ ref: ['DeliveryDocument'], sort: 'asc' }]);
        const result = await conn.run(query);
        return result;
    } catch (error) {
        console.log(`Error during data retrieval:${error.message}`);
    }
}