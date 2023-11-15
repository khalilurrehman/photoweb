<template>
  <div class="home">
    <div v-if="error" class="error"> Could Not fetch the data</div>
    <div v-if="documents"></div>
    <div v-for="doc in documents" :key="doc.id">
      <router-link :to="{ name: 'ImageDetail' , params: {id : doc.id} }">
      <div class="single">
        <div class="thumbnail">
          <img :src="doc.url" />
        </div>
        <div class="info">
          <h3>{{doc.title}}</h3>
          <p>Created By {{ doc.userName }}</p>
        </div>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
export default {
  name: 'HomeView',
  setup()
  {
    const { error, documents } = getCollection('gallery')
    return { error , documents}
  }
}
</script>
<style>
.single{
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover{
  box-shadow: 1px 2px 3px rgba(50,50,50,0.5);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail{
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img{
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info{
  margin: 0 30px;
}
</style>
