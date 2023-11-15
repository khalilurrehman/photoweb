<template>
    <form @submit.prevent="handleSubmit">
   <h4>Gallery</h4>
   <input type="text" placeholder="Title" v-model="title">
   <label> Upload Image </label>
   <input type="file" @change="handleChange">
    <div class="error">{{ fileError }}</div>
   <div class="error"></div>
   <button v-if="!isPending">Create </button>
   <button v-else disabled>Saving... </button>
    </form>
        
   
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from  'vue-router'


export default {
    setup()
    {
        const { filePath , url , uploadImage} = useStorage()
        const { error , addDoc} = useCollection('gallery');
        const { user } = getUser()
        const router = useRouter()


        const title = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)

        const handleSubmit = async () => {
            if(file.value){
                isPending.value = true
                await uploadImage(file.value)
                const res = await addDoc({
                    title: title.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    url: url.value,
                    filePath: filePath.value,
                    createdAt: timestamp()
                })
                isPending.value = false
                if( !error.value){
                    router.push( { name: 'ImageDetail', params: { id: res.id}})
                }
            }
        }

        // Allowed file types

        const types = ['image/png' , 'image/jpeg']

        const handleChange = (e) => {
            const selected = e.target.files[0]
            console.log(selected);
            if(selected && types.includes(selected.type))
            {
                file.value = selected
                fileError.value = null
            } 
            else{
                file.value = null
                fileError.value = "Please select an image file (PNG or JPEG)"
            }
        }

        return { title , handleSubmit , handleChange , fileError ,  isPending}

    }
}
</script>

<style scoped>
    form{
        background: white;
    }
    input[type="file"]{
        border: 0;
        padding: 0;

    }
    label{
        font-size: 12px;
        display:block;
        margin-top: 30px;
    }
    button{
        margin-top: 20px;
    }
</style>