var payment = new Vue({
    el:'#payment',
    data(){
        return{
            payment:{
                numberCard:"",
                cvc:"",
                owner:"",
                deadlineCard:""
            },
            checkNumberCard:false,
            checkCVC:false,
            checkOwner:false,
            checkDeadlineCard:false,
            booking:{}
        }
    },
    created(){
        this.getBooking();

    },
    methods:{
        toFormData: function (obj) {
            var fd = new FormData();
            for (var i in obj) {
                fd.append(i, obj[i]);
            }
            return fd;
        },
        sendPayment: function (){
            var toFromDate = this.toFormData(this.payment);
            if(!(this.payment.owner === "" || this.payment.cvc === "" || this.payment.numberCard === "" ||
                this.payment.deadlineCard === ""))
            axios.post('http://localhost:9001/booking/payment', toFromDate)
                .then(response => {
                    console.log(response.data);
                    document.location.href = "ticket.html";
                })
        },
        getBooking: function (){
            axios.get('http://localhost:9001/booking/booking')
                .then(response => {
                    console.log(response.data);
                    this.booking = response.data;
                })
        },

    }
})