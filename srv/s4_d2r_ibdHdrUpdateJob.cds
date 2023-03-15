// using cds_zapi_ibdhdrcleanupjob as extRAP from './external/ZAPI_IBDHDRCLEANUPJOB_O2';
// using { OP_API_INBOUND_DELIVERY_SRV_0002 as extS4API } from './external/OP_API_INBOUND_DELIVERY_SRV_0002';
using s4_d2r_ibdHdrUpdateJob as db from '../db/data-model';

service jobService {
    entity s4InbDeliveryHeader as projection on db.s4InbDeliveryHeader;
    entity s4InbDeliveryItem as projection on db.s4InbDeliveryItem;
    action scheduledCleanUp() returns array of String;
}