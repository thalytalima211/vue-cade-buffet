const app = Vue.createApp({
    data(){
        return{
            searchField: '',
            buffetList: []
        }
    },
    async mounted(){
        await this.getBuffetData()
    },
    methods:{
        async getBuffetData(){
            let response = await fetch('http://localhost:3000/api/v1/buffets')
            let data = await response.json()
            this.buffetList = []
            data.forEach(buffetData => {
                var buffet = new Object()
                buffet.brand_name = buffetData.brand_name
                buffet.city = buffetData.city
                buffet.state = buffetData.state
                buffet.id = buffetData.id
                this.buffetList.push(buffet)
            })
        },
        async searchBuffet(){
            let response = await fetch(`http://localhost:3000/api/v1/buffets?search=${this.searchField}`)
            let data = await response.json()
            this.buffetList = []
            console.log(data)
            data.forEach(buffetData => {
                var buffet = new Object()
                buffet.brand_name = buffetData.brand_name
                buffet.city = buffetData.city
                buffet.state = buffetData.state
                buffet.id = buffetData.id
                this.buffetList.push(buffet)
            })
        }
    }
})

app.mount('#app')