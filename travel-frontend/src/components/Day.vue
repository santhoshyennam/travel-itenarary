<script setup>
import { onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Loading from "../components/Loading.vue";
import TripServices from "../services/TripServices.js";
import { getImageUrl,getEventUrl,gethotelUrl,getsightUrl } from "../common";


const router = useRouter();
const tripId = router.currentRoute.value.params.id;
const loader = ref(true);
const day= props.day;
const dayInDetail = ref({})

const props = defineProps({
  day: Number,
});
onMounted(async () => {
  await getDayDetails();
  loader.value = false;
});

async function getDayDetails() {
  await TripServices.getDayDetailsOfTrip(tripId,day.id)
    .then((response) => {
      dayInDetail.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}


</script>

<template>
  <v-container>
        <h3>Day {{ day.dayNumber}}</h3>
        <p> {{ day.description }} </p>

        <h5 v-if="dayInDetail.Events?.length != 0" class="title"> Events </h5>
        <div v-for="event in dayInDetail.Events" :key="event.id" class="item">
          <img :src="getImageUrl(event.imageUrl)"  class="image" width="100" height="100"/>
          <div class="details">
          <h5> {{ event.name }} </h5>
          <a class="btn btn-success btn-sm" :href="getEventUrl(event.id)" > Show more </a>
          </div>
        </div>
        <h5 v-if="dayInDetail.Sightseeings?.length != 0" class="title" > SightSeeing </h5>
        <div v-for="sight in dayInDetail.Sightseeings" :key="sight.id" class="item">
          <img :src="getImageUrl(sight.imageUrl)" class="image" width="100" height="100"/>
          <div class="details">
          <h5> {{ sight.name }} </h5>
          <a class="btn btn-success btn-sm" :href="getsightUrl(sight.id)" > Show more </a>
          </div>
        </div>
          <h5 v-if="dayInDetail.HotelStays?.length != 0" class="title" > Hotels </h5>
        <div v-for="stay in dayInDetail.HotelStays" :key="stay.id" class="item">
          <img :src="getImageUrl(stay.imageUrl)" class="image" width="100" height="100"/>
          <div class="details">
          <h5> {{ stay.name }} </h5>
          <p> $ {{ stay.costPerRoom }} / cost per room </p>
          <a class="btn btn-success btn-sm" :href="gethotelUrl(stay.id)" > Show more </a>
          </div>
        </div>
  </v-container>
</template>

<style scoped>

.container {
    background: white;
    padding-bottom: 30px;
}
.item {
  display: flex;
  margin-top: 10px;
}
.details {
  margin-left: 20px;
}
.image {
  border-radius: 5px;
}
.title {
  margin-top: 10px;
}
</style>
