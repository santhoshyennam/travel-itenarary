<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import HotelServices from "../services/HotelServices.js";
import { ref } from "vue";
import { getImageUrl } from "../common";
import Loading from "../components/Loading.vue";

const hotel = ref({});
const loader = ref(true);
const router = useRouter();

onMounted(async () => {
  await getHotel();
  loader.value = false;
});

async function getHotel() {
  await HotelServices.getHotel(router.currentRoute.value.params.id)
    .then((response) => {
      hotel.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <v-container>
       <Loading v-if="loader" />
      <div class="container col-md-12" v-else>
            <div class="row">
                <div class="col-md-5">
                    <img :src="getImageUrl(hotel.imageUrl)" class="image"/>
                </div>
                <div class="col-md-7">
                    <h2>{{ hotel.name }}</h2>
                    <h5 class="underline"> Description </h5>
                    <p class="col-md-12">{{ hotel.description }}</p>
                    <h5 class="underline"> Details </h5>
                    <p>Cost per one room <strong> ${{ hotel.costPerRoom }}</strong></p>
                </div>
            </div>
      </div>
  </v-container>
</template>

<style scoped>
.container {
  margin-top:20px;background-color:white;padding:50px;
}
.image {
  width:100%;max-height:500px;
}
</style>