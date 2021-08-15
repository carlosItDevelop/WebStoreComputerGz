import { BillDetail } from "./billDetail";
import { BillStatus } from "./billStatus";

export interface Bill
{
    id: number;

    name: string;
    phone: string;
    address: string;
    totalPrice:number;
    orderDate : Date
    billStatus : BillStatus;
    billDetail:BillDetail[];
}
