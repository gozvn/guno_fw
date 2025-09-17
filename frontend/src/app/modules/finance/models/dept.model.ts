export class FinanceDept {
    id: any = '';
    number: number = 0;
    object_id: any = '';
    object_type: any;
    status: string = 'draft';
    mobile: any = '';
    customer_name: any = '';
    [key: string]: any;

    constructor(item?: any) {
        if (item) {
            for (const key in item) {
                this[key] = item[key];
            }
        }
    }
}
