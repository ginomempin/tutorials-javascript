export default class Likes {
    constructor() {
        this.items = [];
    }

    addLike(id, title, author, imgUrl) {
        const item = {
            id,
            title,
            author,
            imgUrl
        }

        this.items.push(item);
        this.persistData();

        return item;
    }

    deleteLike(id) {
        const itemIdx = this.items.findIndex((el) => el.id === id);
        if (itemIdx > -1) {
            this.items.splice(itemIdx, 1);
        }

        this.persistData();
    }

    isLiked(id) {
        return this.items.findIndex((el) => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.items.length;
    }

    /**
     * Persist data in Local Storage
     */
    persistData() {
        localStorage.setItem("likes", JSON.stringify(this.items));
    }

    /**
     * Restore data from Local Storage
     */
    retrieveData() {
        const storageData = localStorage.getItem("likes");
        if (storageData) {
            this.items = JSON.parse(storageData);
        }
    }
}
