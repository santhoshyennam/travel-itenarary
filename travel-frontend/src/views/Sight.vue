<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import SightSeeingServices from "../services/SightSeeingServices.js";
import { ref } from "vue";
import { getImageUrl } from "../common";
import Loading from "../components/Loading.vue";

const sight = ref({});
const loader = ref(true);
const router = useRouter();

onMounted(async () => {
  await getSight();
  loader.value = false;
});

async function getSight() {
  await SightSeeingServices.getSight(router.currentRoute.value.params.id)
    .then((response) => {
      sight.value = response.data;
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
                    <img :src="getImageUrl(sight.imageUrl)" class="image"/>
                </div>
                <div class="col-md-7">
                    <h2>{{ sight.name }}</h2>
                    <h5 class="underline"> Description </h5>
                    <p class="col-md-12">{{ sight.description }}</p>
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