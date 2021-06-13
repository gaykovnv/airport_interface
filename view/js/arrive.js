var arrive = new Vue({
    el:'#arrive',
    data(){
        return{
            message:"hello vue",
            timetableArrive:[],
            send:{
                id:"",
                fromCity: ""
            }

        }
    },
    created(){
        this.getTimetableArrive();
    },
    methods:{
        toFormData: function (obj) {
            var fd = new FormData();
            for (var i in obj) {
                fd.append(i, obj[i]);
            }
            return fd;
        },
        findByFilterArrive: function (){
            if(!(this.send.fromCity === "")) {
                var formData = this.toFormData(this.send);
                axios.post('http://localhost:9001/api/timetable/filterArrive', formData)
                    .then(response => {
                        this.timetableArrive = response.data;
                        console.log(this.timetableArrive);
                    })
            }else{
                this.getTimetableArrive();
            }
        },
        getTimetableArrive: function (){
            axios.get('http://localhost:9001/api/timetable/arrive')
                .then(response => {
                    this.timetableArrive = response.data;
                    console.log(this.timetableArrive);
                })
        },


    }
})