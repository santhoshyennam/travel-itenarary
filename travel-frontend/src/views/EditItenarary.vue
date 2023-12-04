<script setup>
import { onMounted } from "vue";
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
const trip = ref({
  title: "",
  description: "",
  costPerPerson: "",
  rating: "",
  imageUrl: "",
  origin: "",
  destination: "",
  start_date: "",
  end_date: "",
});
const isLoading = ref(false);
const tripId = router.currentRoute.value.params.id;

onMounted(async () => {
   await getTrip();
});

function closeSnackBar() {
  snackbar.value.value = false;
}

async function getTrip() {
    isLoading.value = true
    await TripServices.getTrip(tripId)
        .then((response) => {
            trip.value = response.data
            isLoading.value = false
        })
        .catch((error) => {
            isLoading.value = false
        });
}

async function updateTrip() {
    isLoading.value = true
    await TripServices.updateTrip(trip.value)
        .then((response) => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = "Itenarary updated successfully!";
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
        <v-card-title class="headline mb-2">Edit Itenarary </v-card-title>
        <Loading v-if="isLoading" />
        <v-card-text v-else>
          <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" v-model="trip.title"/>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" rows="5" v-model="trip.description"></textarea>
        </div>
        <div class="mb-3">
          <label for="cost" class="form-label">Cost Per Person</label>
          <input type="text" class="form-control" id="cost" v-model="trip.costPerPerson"/>
        </div>
        <div class="mb-3">
          <label for="rating" class="form-label">Rating</label>
          <input type="text" class="form-control" id="rating" v-model="trip.rating"/>
        </div>
        <div class="mb-3">
          <label for="origin" class="form-label">Origin</label>
          <input type="text" class="form-control" id="origin" v-model="trip.origin"/>
        </div>
              <div class="mb-3">
          <label for="destination" class="form-label">Destination</label>
          <input type="text" class="form-control" id="destination" v-model="trip.destination"/>
        </div>
        <div class="mb-3">
          <label for="start_date" class="form-label">Start Date</label>
          <input type="date" class="form-control" id="start_date" v-model="trip.start_date"/>
        </div>
        <div class="mb-3">
          <label for="end_date" class="form-label">End Date</label>
          <input type="date" class="form-control" id="end_date" v-model="trip.end_date"/>
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Image Path</label>
          <input type="text" class="form-control" id="image" v-model="trip.imageUrl"/>
        </div>
        
        
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="updateTrip()">Update</v-btn>
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