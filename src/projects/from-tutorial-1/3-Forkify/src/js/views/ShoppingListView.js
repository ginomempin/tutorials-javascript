import { elements } from "./base";

export const addUpdateListListener = (f) => {
    elements.shoppingListPanel.addEventListener("click", (evt) => {
        const item = evt.target.closest(".shopping__item");
        const itemId = item.dataset.itemid;

        if (evt.target.matches(".shopping__delete, .shopping__delete *")) {
            f("del", itemId);
        } else if (evt.target.matches(".shopping__count-value")) {
            f("cnt", itemId, parseFloat(evt.target.value));
        }
    });
}

export const renderItem = (item) => {
    const markup = `
        <li class="shopping__item" data-itemid="${item.id}">
            <div class="shopping__count">
                <input type="number" class="shopping__count-value" value="${item.count}" step="${item.count}">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    elements.shoppingListPanel.insertAdjacentHTML("beforeend", markup);
};

export const deleteItem = (itemId) => {
    const item = document.querySelector(`[data-itemid="${itemId}"]`);
    if (item) {
        item.parentElement.removeChild(item);
    }
};
