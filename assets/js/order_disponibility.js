var event_type_id = window.location.href.match(/event_type_id=([^&]+)/)[1]
var buffet_id = window.location.href.match(/buffet_id=([^&]+)/)[1]

const app = Vue.createApp({
    data(){
        return{
            formData:{
                number_of_guests: null,
                estimated_date: ''    
            },
            result: '',
            errors: ''
            
        }
    },
    methods:{
        async handleSubmit(){
            let response = await fetch(`http://localhost:3000/api/v1/buffets/${buffet_id}/event_types/${event_type_id}/disponibility?estimated_date=${this.formData.estimated_date}&number_of_guests=${this.formData.number_of_guests}`)
            let data = await response.json()
            if(response.status == 200){
                this.error = ''
                this.result = data 
            }else{
                console.log(data.errors)
                this.errors = data.errors
                this.result = ''
            }
        }
    }
})

app.mount("#app")
