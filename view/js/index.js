var timetable = new Vue({
    el:'#timetable',
    data(){
        return{
            message:"hello vue",
            timetable:[],
            send:{
                id:"",
                toCity:""
            }
        }
    },
    created(){
        this.getTimetable();
    },
    methods:{
        toFormData: function (obj) {
            var fd = new FormData();
            for (var i in obj) {
                fd.append(i, obj[i]);
            }
            return fd;
        },
        getTimetable: function (){
            axios.get('http://localhost:9001/api/timetable/send')
                .then(response => {
                    this.timetable = response.data;
                    console.log(this.timetable);
                })
        },
        findByFilter: function (){
            if(!(this.send.toCity === "")) {
                var formData = this.toFormData(this.send);
                axios.post('http://localhost:9001/api/timetable/filter', formData)
                    .then(response => {
                        this.timetable = response.data;
                        console.log(this.timetable);
                    })
            }else{
                this.getTimetable();
            }
        },
        saveFlight: function (elem){
            var toFormData = this.toFormData(elem);
            axios.post('http://localhost:9001/booking/flight/'+elem.id, toFormData)
                .then(response => {
                    console.log(response.data)
                    document.location.href = "buyTicket.html";
                })
        }

    }
})