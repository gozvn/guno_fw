export class Order {
    order_id: any = '';
    data: any;
    status: any = 0;
    source: any = '';
    [key: string]: any;

    constructor(item?: any) {
        if (item) {
            for (const key in item) {
                this[key] = item[key];
            }
        }
    }

    countProduct() {
        const items = this.data.items;
        return items.length;
    }

    hasManyProduct() {
        const items = this.data.items;
        return items.length > 1 ? true : false;
    }

    getProducts() {
        const items = this.data.items;
        const products = [];
        for (const i in items) {
            const item = items[i];
            const fields = item.variation_info.fields;
            let variationName = '';
            for (const j in fields) {
                variationName += variationName ? ', ' : '';
                variationName += `${fields[j].name}: ${fields[j].value}`
            }

            products.push({
                name: item.variation_info.name,
                variation: variationName,
                quantity: parseInt(item.quantity)
            })
        }

        return products;
    }
}
