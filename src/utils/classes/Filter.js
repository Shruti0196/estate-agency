class Filter {
    constructor(status = "all", price = 100000000000, location = "all") {
        this.status = status;
        this.price = price;
        this.location = location;
    }
}

export default Filter;
