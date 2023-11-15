<template>
<div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="document" class="image-detail">
         <div class="image-info">
             <img :src="document.url" >
             <h2> {{ document.title }} </h2>
                  <p class="username">Created by {{ document.userName }}</p>
                  <button v-if="ownership" @click="handleDelete" >Delete Image</button>
    
         </div>

    </div>
</div>
</template>

<script>

import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    props: ['id'],
    setup(props){
        const { error, document } = getDocument('gallery', props.id)
        const { user } = getUser()
        const { deleteDoc } = useDocument('gallery' , props.id)
        const { deleteImage } =  useStorage()
        const router = useRouter()

        const ownership = computed(() => {
            return document.value && user.value && user.value.uid == document.value.userId
        })

        const handleDelete = async () => {
            await deleteImage(document.value.filePath)
            await deleteDoc()
            router.push({ name: 'Home'})

        }
        return { error, document , ownership , handleDelete }
    }
}
</script>

<style>
    .image-detail{
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 80px; 
    }
    .cover{
        overflow: hidden;
        border-radius: 20px;
        position: relative;
        padding: 160px;
    }
    .cover img{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        max-width: 200%;
        max-height: 200%;
    }
    .image-info{
        text-align: center;
    }
    .image-info h2{
        text-transform: capitalize;
        font-size: 28px;
        margin-top: 20px;
    }
    .image-info p {
        margin-bottom: 20px;
    }
    .username{
        color: #999;
    }

</style>