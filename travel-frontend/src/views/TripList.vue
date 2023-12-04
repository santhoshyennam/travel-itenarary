<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "../components/Loading.vue";
import TripServices from "../services/TripServices.js";
import { ref } from "vue";
import { getImageUrl,getTripUrl } from "../common/";

const trips = ref([]);
const temp_trips = ref([]);
const isLoading = ref(true);
const router = useRouter();
const params = ref(router.currentRoute.value.query);
const search = ref("");
const user = ref(null);

onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));
  await getTrips();
  isLoading.value = false;
});

async function getTrips() {
  await TripServices.getTrips(params.value)
    .then((response) => {
      temp_trips.value = response.data;
      trips.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function filterTrips() {
    const newTrips = temp_trips.value
    const filteredPlaces = newTrips.filter((trip) => {
        return (
        trip.title.toLowerCase().includes(search.value.toLowerCase()) ||
        trip.description.toLowerCase().includes(search.value.toLowerCase())
        );
    });
    trips.value = filteredPlaces;
}

</script>

<template>
  <v-container>
      <div class="container" style="margin-top:20px">
        <div class="centered-container">
            <div class="col-md-6">
                <div class="input-group rounded">
                    <input type="search" class="form-control rounded" placeholder="Search Trip" aria-label="Search" aria-describedby="search-addon" v-model="search"/>
                    <span class="input-group-text border-0" id="search-addon" @click="filterTrips()" style="cursor:pointer">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
            </div>
            <a href="/travel-frontend/add-itenarary"><button type="button" class="btn btn-success button" v-if="user!= null && user.isAdmin != 0" >Add Itenarary</button></a>
            <a href="/travel-frontend/add-day"><button type="button" class="btn btn-success button" v-if="user!= null && user.isAdmin != 0" >Add Day</button></a>
        </div> <br/>
         <div style="display: flex; justify-content: center;">
            <h3>Itenarary</h3>
        </div> <br/>
        <Loading v-if="isLoading" />
         <div class="text-center" v-if="!loader && trips.length == 0">
                <h4 class="text-muted">No Trips available</h4>
                <p class="text-muted">Please check back later.</p>
            </div>
        <div v-for="trip in trips" :key="trip.id" class="card col-md-12" style="height:200px;margin-bottom:20px;" v-else>
            <div class="row no-gutters">
                <div class="col-sm-5 col-md-4">
                    <img class="card-img" :src="getImageUrl(trip.imageUrl)" alt="">
                </div>
                <div class="col-sm-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ trip.title }}</h5>
                        <p class="card-text">{{ trip.description }}</p>
                        <div style="display:flex;">
                            <a :href="getTripUrl(trip.id)" style="margin-left: auto;">View More</a>
                        </div>
                    </div>
                </div>
            </div><br/> 
        </div>     
        </div>
  </v-container>
</template>

<style scoped>
.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
.button {
  width:150px;height:50px;color:white;background-color:#555;margin-left: 20px;
}
.card-img {
  max-height: 200px;
}
</style>