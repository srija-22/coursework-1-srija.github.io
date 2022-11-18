const app = new Vue({
    el: "#instance",
    data: {
        showCart: false,
        searchValue: "",
        name: "",
        phone: "",
        nameError: "",
        phoneError: "",
        sortBy: "",
        orderBy: "",
        cart: [],
        error: {
            name: "",
            phone: "",
        },
        lessons: lessons,
    },
});