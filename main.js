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
    computed: {
        cartSize: function () {
            return this.cart.length;
        },

        filteredLessons() {
            let modifiedLessons = this.lessons;

            if (this.searchValue != "" && this.searchValue) {
                modifiedLessons = this.lessons.filter((item) => {
                    return item.subject.toUpperCase().includes(this.searchValue.toUpperCase()) || item.location.toUpperCase().includes(this.searchValue.toUpperCase());
                });
            }

            if (this.orderBy === "asc") {

                modifiedLessons = modifiedLessons.sort((a, b) => {
                    if (this.sortBy == "subject") {

                        if (a.subject.toLowerCase() < b.subject.toLowerCase()) {
                            return -1;
                        }
                        if (a.subject.toLowerCase() > b.subject.toLowerCase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else if (this.sortBy == "location") {
                        if (a.location.toLowerCase() < b.location.toLowerCase()) {
                            return -1;
                        }
                        if (a.location.toLowerCase() > b.location.toLowerCase()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else if (this.sortBy == "price") {
                        if (a.price < b.price) {
                            return -1;
                        }
                        if (a.price > b.price) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else if (this.sortBy == "availability") {
                        if (a.spaces < b.spaces) {
                            return -1;
                        }
                        if (a.spaces > b.spaces) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                });

            } else {

                modifiedLessons = modifiedLessons.sort((a, b) => {
                    if (this.sortBy == "subject") {

                        if (a.subject.toLowerCase() < b.subject.toLowerCase()) {
                            return 1;
                        }
                        if (a.subject.toLowerCase() > b.subject.toLowerCase()) {
                            return -1;
                        } else {
                            return 0;
                        }
                    } else if (this.sortBy == "location") {
                        if (a.location.toLowerCase() < b.location.toLowerCase()) {
                            return 1;
                        }
                        if (a.location.toLowerCase() > b.location.toLowerCase()) {
                            return -1;
                        } else {
                            return 0;
                        }
                    } else if (this.sortBy == "price") {
                        if (a.price < b.price) {
                            return 1;
                        }
                        if (a.price > b.price) {
                            return -1;
                        } else {
                            return 0;
                        }
                    } else if (this.sortBy == "availability") {
                        if (a.spaces < b.spaces) {
                            return 1;
                        }
                        if (a.spaces > b.spaces) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                });

            }

            return modifiedLessons;
        },
        isFormValid() {
            return this.name && this.phone && !this.nameError && !this.phoneError
        }
    },
    watch: {
        name(value) {
            if (!value) {
                this.nameError = "Please enter your name";
            } else if (!/^[A-Za-z\s]*$/.test(value)) {
                this.nameError = "Your name must only contain letters";
            } else {
                this.nameError = "";
            }
        },
        phone(value) {
            if (!value) {
                this.phoneError = "Please enter your phone number";
            } else if (!/^[0-9]+$/.test(value)) {
                this.phoneError = "Your phone number must only contain numbers";
            } else {
                this.phoneError = "";
            }
        },
    },
});