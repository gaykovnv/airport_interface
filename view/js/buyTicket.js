var buyTicket = new Vue({
    el:'#buyTicket',
    data(){
        return{
            addUser: {
                fname: "",
                lname: "",
                middlenName: "",
                phone: "",
                quantity: "0",
                passportSeries: "",
                passportNumber: "",
                comfort: "Эконом",
                orientation:"",
                allPrice:""
            },
            sent: false,
            check: false,
            checkFname: false,
            checkLname: false,
            checkPhone: false,
            checkComfort: false,
            checkOrientation:false,
            checkQuantity: false,
            checkPassportNumber: false,
            checkPassportSeries: false,
            exitFrom:false,
            flight:{}
        }
    },
    created(){
        this.getFlight();
    },
    methods: {
        checkInput(user) {
            if (user.quantity == "") {
                this.checkQuantity = true;
            }
            if (user.passportNumber == "" || !(user.passportNumber.length == 6)) {
                this.checkPassportNumber = true;
            }
            if (user.passportSeries == "" || !(user.passportSeries.length == 4)) {
                this.checkPassportSeries = true;
            }
            if (user.fname == "") {
                this.checkFname = true;
            }
            if (user.lname == "") {
                this.checkLname = true;
            }
            if (user.phone == "" || !(user.phone[0] == 8 && user.phone[1] == 9 && user.phone.length == 11)) {
                this.checkPhone = true;
            }
            if (user.orientation == "") {
                this.checkOrientation = true;
            }
            if (user.comfort == "") {
                this.checkComfort = true;
            }
        },
        toFormData: function (obj) {
            var fd = new FormData();
            for (var i in obj) {
                fd.append(i, obj[i]);
            }
            return fd;
        },
        getFlight: function (){
            axios.get('http://localhost:9001/booking/getFlight')
                .then(response => {
                    this.flight = response.data;
                    console.log(this.flight);
                })
        },
        savePerson: function () {
            this.checkInput(this.addUser);
            var formData = this.toFormData(this.addUser);
            if (!(this.addUser.fname === "" || this.addUser.lname === "" || this.addUser.quantity === ""
                || this.addUser.passportNumber === "" || this.addUser.passportSeries === "" || this.addUser.orientation === ""
                || this.addUser.comfort === "" || !(this.addUser.phone[0] == 8 || this.addUser.phone[1] == 9
                    || this.addUser.phone.length === 11))) {

                    axios.post('http://localhost:9001/booking/addCustomer', formData)
                        .then(response => {
                            this.sent = true;
                            this.checkFname = false;
                            this.checkLname = false;
                            this.checkPhone = false;
                            this.checkOrientation = false;
                            this.checkComfort = false;
                            this.checkPassportSeries = false;
                            this.checkPassportNumber = false;
                            this.check = false;
                            this.exitFrom = false;
                            console.log(response)
                            document.location.href = "payment.html"
                        })
            } else {
                this.check = true;
            }
        }
    }
})