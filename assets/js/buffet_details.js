const id = window.location.href.split('=').pop()

const app = Vue.createApp({
    data(){
        return{
            buffetData: new Object(),
            eventTypeList: []
        }
    },
    async mounted(){
        await this.getBuffetDetails()
        await this.getEventTypes()
    },
    methods:{
        async getBuffetDetails(){
            let response = await fetch(`http://localhost:3000/api/v1/buffets/${id}`)
            let buffet = await response.json()
            this.buffetData.brand_name = buffet.brand_name
            this.buffetData.city = buffet.city
            this.buffetData.description = buffet.description
            this.buffetData.email = buffet.email
            this.buffetData.full_address = buffet.full_address
            this.buffetData.neighborhood = buffet.neighborhood
            this.buffetData.number_phone = buffet.number_phone
            this.buffetData.state = buffet.state
            this.buffetData.zip_code = buffet.zip_code
            this.buffetData.id = buffet.id
            this.buffetData.payment_methods = []
            buffet.payment_methods.forEach(pm => this.buffetData.payment_methods.push(pm.name))
        },
        async getEventTypes(){
            let response = await fetch(`http://localhost:3000/api/v1/buffets/${id}/event_types`)
            let data = await response.json()
            this.eventTypeList = []
            data.forEach(eventType => {
                let newEventType = new Object()
                newEventType.buffet_id = eventType.buffet_id
                newEventType.id = eventType.id
                newEventType.name = eventType.name
                newEventType.description = eventType.description
                newEventType.default_duration = eventType.default_duration
                newEventType.menu = eventType.menu
                newEventType.min_guests = eventType.min_guests
                newEventType.max_guests = eventType.max_guests
                newEventType.additional_per_guest = eventType.additional_per_guest
                newEventType.default_address = eventType.default_address
                newEventType.extra_hour_value = eventType.extra_hour_value
                newEventType.min_value = eventType.min_value
                newEventType.weekend_additional_per_guest = eventType.weekend_additional_per_guest
                newEventType.weekend_min_value = eventType.weekend_min_value
                newEventType.weekend_extra_hour_value = eventType.weekend_extra_hour_value
                newEventType.offer_drinks = eventType.offer_drinks
                newEventType.offer_decoration = eventType.offer_decoration
                newEventType.offer_parking_service = eventType.offer_parking_service
                this.eventTypeList.push(newEventType)
            })
        }
    }
})

app.mount('#app')