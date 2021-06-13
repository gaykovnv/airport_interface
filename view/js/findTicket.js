var findTicket = new Vue({
    el: '#findTicket',
    data() {
        return {
            message: "Filter by:",
            toDB: {
                phone: "",
                fname: "",
                lname: "",
                passportSeries: "",
                passportNumber: "",
            },
            filter: false,
            ticket: {},
            show:false
        }
    },
    methods: {
        toFormData: function (obj) {
            var fd = new FormData();
            for (var i in obj) {
                fd.append(i, obj[i]);
            }
            return fd;
        },
        findTicketByPhone: function () {
            if (!(this.toDB.phone === "" && this.toDB.fname === "" && this.toDB.lname === "" &&
                this.toDB.passportSeries === "" && this.toDB.passportNumber === "")) {
                var formData = this.toFormData(this.toDB);
                axios.post('http://localhost:9001/search/findTicket', formData)
                    .then(response => {
                        console.log(response.data);
                        this.ticket = response.data;
                    })
                this.show = true;

            } else {
                this.show = false;
            }

        }
    }
})