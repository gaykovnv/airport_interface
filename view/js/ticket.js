var ticket = new Vue({
    el:'#ticket',
    data(){
        return{
            ticket:{}
        }
    },
    created(){
        this.getTicket();
    },
    methods:{
        getTicket: function (){
            axios.get('http://localhost:9001/booking/getTicket')
                .then(response => {
                    console.log(response.data);
                    this.ticket = response.data;
                })
        }
    }
})