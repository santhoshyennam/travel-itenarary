<script setup>
import { onMounted, watch } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import TripServices from "../services/TripServices.js";
import Loading from "../components/Loading.vue";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const day = ref({
  dayNumber: "",
  description: "",
  ItineraryId: "",
});
const trips = ref({})
const isLoading = ref(true);

onMounted(async () => {
    await getTrips();
    isLoading.value = false;
});

function closeSnackBar() {
  snackbar.value.value = false;
}
async function getTrips() {
  await TripServices.getTrips()
    .then((response) => {
      trips.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function addDay() {
    isLoading.value = true
    await TripServices.addDay(day.value)
        .then((response) => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = "Itenarary created successfully!";
            isLoading.value = false
        })
        .catch((error) => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
            isLoading.value = false
        });
}

</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Add Day </v-card-title>
        <Loading v-if="isLoading" />
        <v-card-text v-else>
          <div class="mb-3">
          <label for="title" class="form-label">Day Number</label>
          <input type="text" class="form-control" id="day" v-model="day.dayNumber"/>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" rows="5" v-model="day.description"></textarea>
        </div>
        <div class="mb-3">
          <label for="cost" class="form-label">Itinerary</label>
              <select class="form-control" id="dropdown" v-model="day.ItineraryId">
                <option value="">-- Select Itinerary  --</option>
                <option v-for="trip in trips" :key="trip.id" :value="trip.id"> {{trip.id}}.{{trip.title}}</option>
            </select>
        </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="addDay()">Add</v-btn>
        </v-card-actions>
      </v-card>
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
    </div>
  </v-container>
</template>