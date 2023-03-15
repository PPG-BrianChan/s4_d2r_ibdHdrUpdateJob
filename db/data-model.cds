namespace s4_d2r_ibdHdrUpdateJob;

using {OP_API_INBOUND_DELIVERY_SRV_0002 as extS4API} from '../srv/external/OP_API_INBOUND_DELIVERY_SRV_0002.csn';

entity s4InbDeliveryHeader as projection on extS4API.A_InbDeliveryHeader{
    key DeliveryDocument,
    OverallGoodsMovementStatus,
    to_DeliveryDocumentItem : redirected to s4InbDeliveryItem
}

entity s4InbDeliveryItem as projection on extS4API.A_InbDeliveryItem{
    DeliveryDocument,
    DeliveryDocumentItem,
    GoodsMovementStatus
}