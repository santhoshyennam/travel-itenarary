<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import HotelServices from "../services/HotelServices.js";
import { ref } from "vue";
import Loading from "../components/Loading.vue";
import { getImageUrl,gethotelUrl } from "../common/";


const sights = ref([]);
const loader = ref(true);

onMounted(async () => {
  await getSights();
  loader.value = false;
});

async function getSights() {
  await HotelServices.getHotels()
    .then((response) => {
      sights.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}


</script>

<template>
  <v-container>
      <div class="container" style="margin-top:20px">
        <div class="centered-container">
            <div class="col-md-6">
                <div class="input-group rounded">
                    <input type="search" class="form-control rounded" placeholder="Search Place" aria-label="Search" aria-describedby="search-addon" />
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
            </div>
        </div> <br/>
         <div style="display: flex; justify-content: center;">
            <h3>Hotels</h3>
        </div> <br/>
            <Loading v-if="loader" />
             <div class="text-center" v-if="!loader && sights.length == 0">
                <h4 class="text-muted">No Places available</h4>
                <p class="text-muted">Please check back later.</p>
            </div>
            <div class="row" v-else>
                <div class="col-md-6 col-lg-4 mb-4 mb-md-0" v-for="sight in sights" :key="sight.id">
                    <div class="card ">
                    <div class="div-card-image">
                        <img class="card-img" :src="getImageUrl(sight.imageUrl)" alt="">
                    </div>
                    <div class="card-body">
                        <h4 class="card-tile">{{ sight.name }}</h4>
                        <p> {{ sight.description.slice(0,120) }}</p>
                        <a class="card-link" :href="gethotelUrl(sight.id)">Show More <i class="ti-arrow-right"></i></a>
                    </div>
                    </div>
                </div>
            </div>
      </div><br/>
  </v-container>
</template>

<style scoped>
.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-img {
    border-radius: 7px;
    max-height: 350px;
}
.card-title {
    margin-top: 10px;
}
a:hover {
    color:black;
}
.place {
    cursor: pointer;
    margin-top: 20px;
}
.btn {
    color: white;
    background-color: #FE7A15;
}
</style>