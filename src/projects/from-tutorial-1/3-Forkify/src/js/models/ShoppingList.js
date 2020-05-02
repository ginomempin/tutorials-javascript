import uniqid from "uniqid";

export default class ShoppingList {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const itemIdx = this.items.findIndex((el) => el.id === id);
        if (itemIdx > -1) {
            this.items.splice(itemIdx, 1);
        }
    }

    updateItemCount(id, newCount) {
        const item = this.items.find((el) => el.id === id);
        if (item) {
            item.count = newCount;
        }
    }
}
