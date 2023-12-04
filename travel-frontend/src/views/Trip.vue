<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getImageUrl,getEditTrip } from "../common/";
import Loading from "../components/Loading.vue";
import TripServices from "../services/TripServices.js";
import OrderServices from "../services/OrderServices.js";
import Day from "../components/Day.vue";


const router = useRouter();
const tripId = router.currentRoute.value.params.id;
const trip = ref({})
const user = ref(null);
const loader = ref(true);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));
  console.log("user",user)
  await getTrip();
  loader.value = false;
});

async function getTrip() {
  await TripServices.getTrip(tripId)
    .then((response) => {
      trip.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function deleteTrip() {
    loader.value = true;
    await TripServices.deleteTrip(tripId)
    .then((response) => {
        loader.value = false;
        router.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error);
        loader.value = false;
    });
}

async function bookTrip() {
    loader.value = true;
    await OrderServices.addOrder({
        userId: user.value.id,
        tripId: tripId,
        totalCost: trip.value.costPerPerson
    })
    .then((response) => {
        loader.value = false;
         snackbar.value.value = true;
        snackbar.value.color = "green";
        snackbar.value.text = "Order place successfully!";
    })
    .catch((error) => {
      console.log(error);
        loader.value = false;
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = error.response.data.message;
    });
}

function closeSnackBar() {
  snackbar.value.value = false;
}

</script>

<template>
  <v-container>
        <Loading v-if="loader" />
      <div class="col-md-12 container elevation-5" v-else>
            <div class="row">
                <div class="col-md-5">
                    <img :src="getImageUrl(trip.imageUrl)" class="large-image"/>
                </div>
                <div class="col-md-7">
                    <h2>{{ trip.title }}</h2>
                    <h5 class="underline"> Description </h5>
                    <p class="col-md-12">{{ trip.description }}</p>
                    <h5 class="underline"> Details </h5>
                    <p>Begin on <strong>{{ trip.start_date }}</strong></p>
                    <p>Ends date on <strong>{{ trip.end_date }} </strong></p>
                    <p>Total cost is <strong>${{ trip.costPerPerson }} / person </strong></p>
                    <button type="button" class="btn btn-success book-button" v-if="user!= null && user.isAdmin == 0" @click="bookTrip()" >Book Now</button>
                </div>
            </div>
            <div v-for="(day,index) in trip.Days" :key="index" class="days">
                <Day :day="day" />
            </div>
            <div class="edit-delete" v-if="user!= null && user.isAdmin != 0">
                <a type="button" class="btn btn-warning button" :href="getEditTrip(tripId)">Edit</a>
                <a type="button" class="btn btn-primary button" @click="deleteTrip()">
                    Delete
                </a>
            </div>
      </div>
       <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </v-container>
</template>

<style scoped>

.container {
    background: white;
    padding-bottom: 30px;
}
.row {
    margin-top:20px;
    padding:50px;
}
.large-image {
    width:100%;max-height:500px;
    border-radius: 5px;
}
.day-title {
    display:flex;
    padding:20px;
    border:1px black solid;
    border-radius:5px;
}
.showall {
    color:white;
    margin-left:auto;
    width:100%;
}
.days {
  margin-top: 30px;
  width:70%;
  border: 2px solid black;
  padding:15px;
  margin-left: 20px;
}
.day {
  margin-bottom: 30px;
  width: 100%;
}
.underline {
    border-bottom: 2px solid black ;
    margin-bottom: 15px;
}
.book-button,.button {
    color: white;
    margin-right: 10px;
}
.edit-delete {
    display:flex;
    align-content: flex-end;
    margin-left:auto;
    margin-top: 20px;
    margin-left: 20px;
}


.day-wrapper {
  display: flex;
  justify-content: center;
}
</style>
