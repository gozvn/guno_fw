export class Product {
    product_id: any = '';
    shop_id: any = '';
    display_id: any = '';
    custom_id: any = '';
    cost_price: any = 0;
    data: any;
    [key: string]: any;

    constructor(item?: any) {
        if (item) {
            for (const key in item) {
                this[key] = item[key];
            }
        }
    }
}
