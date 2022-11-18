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
    methods: {
        addToCart(lesson) {
            this.cart.push(lesson);

            this.lessons.find(function(item) {
                if (item.id === lesson.id) lesson.spaces = --lesson.spaces
            })
        },
        removeFromCart(id) {
            const index = this.cart.findIndex((item) => item.id === id);

            this.cart.splice(index, 1);

            this.lessons.forEach(function(lesson) {
                if (lesson.id === id) lesson.spaces += 1
            })

            if (this.cart.length == 0) this.showCart = false
        },
        toggleCart() {
            this.showCart = !this.showCart
        },
        checkout() {
            alert("You've checked out successfully");

            this.cart = [];

            this.name = ""
            this.phone = ""

            location.reload()
        },
    },
});