<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import HotelServices from "../services/HotelServices.js";
import EventServices from "../services/EventServices.js";
import SightSeeingServices from "../services/SightSeeingServices.js";

import { ref } from "vue";
import Loading from "../components/Loading.vue";
import { getImageUrl,domainUrl,getEventsUrl,getHotelsUrl,getSightsUrl,getsightUrl,getEventUrl,gethotelUrl } from "../common/";


const hotels = ref([]);
const events = ref([]);
const sights = ref([]);
const loader = ref(true);
const tripSearch = ref({
  starts: "",
  ends: "",
  origin: "",
  destination: ""
})

onMounted(async () => {
  await getHotels();
  await getSights();
  await getEvents();
  loader.value = false;
});

async function getHotels() {
  await HotelServices.getHotels()
    .then((response) => {
      hotels.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
async function getSights() {
  await SightSeeingServices.getSights()
    .then((response) => {
      sights.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getEvents() {
  await EventServices.getEvents()
    .then((response) => {
      events.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getTrips = () => {
  return domainUrl+"trips?starts="+tripSearch.value.starts+"&ends="+tripSearch.value.ends+"&origin="+tripSearch.value.origin+"&destination="+tripSearch.value.destination
}
</script>
<template>
        <header class="header">
            <div class="container position-relative">
                <div class="row justify-content-center">
                    <div class="col-xl-6">
                        <div class="text-center text-white">
                            <h1 class="mb-5">Travel with us...Travel with world!</h1>
                            <div class="container" style="padding:10px;">
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <input type="text" class="form-control" id="from" placeholder="Origin" v-model="tripSearch.origin">
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <input type="text" class="form-control" id="to" placeholder="Destination"  v-model="tripSearch.destination">
                                  </div>
                                </div>
                              </div><br/>
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <input type="date" class="form-control" id="departure"  v-model="tripSearch.starts">
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <input type="date" class="form-control" id="return"  v-model="tripSearch.ends">
                                  </div>
                                </div>
                                <div class="col-md-12">
                                  <div class="form-group">
                                    <a type="submit" class="btn" :href="getTrips()">Search</a>
                                  </div>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </header><br/>

       <section class="section-margin">
      <div class="container">
        <div class="section-intro text-center pb-80px">
          <h2>Explore Our Hotels</h2>
        </div>

        <div class="row">
          <div class="col-md-6 col-lg-4 mb-4 mb-md-0" v-for="hotel in hotels.slice(0,3)" :key="hotel.id">
            <div class="card ">
            <div class="div-card-image">
                <img class="card-img" :src="getImageUrl(hotel.imageUrl)" alt="">
            </div>
            <div class="card-body">
                  <h3 class="card-price">{{ hotel.costPerRoom }} <sub>/ Per Night</sub></h3>
                <div class="card-tile">
                  <h4>{{ hotel.name }}</h4>
                  <p> {{ hotel.description.slice(0,60) }}</p>
                  </div>
                <a class="card-link" :href="gethotelUrl(hotel.id)">Show More <i class="ti-arrow-right"></i></a>
            </div>
            </div>
        </div>
        </div>
      </div>
    </section><br/>

    <div class="row justify-content-center">
        <div class="col-md-2 show-more">
         <a :href="getHotelsUrl()"><button type="button" class="btn btn-warning show-more-button" >Show More</button></a>
        </div>
    </div><br/><br/>


    <section class="section-margin">
      <div class="container">
        <div class="section-intro text-center pb-80px">
          <h2>Events</h2>
        </div>

        <div class="row">
           <div class="col-md-6 col-lg-4 mb-4 mb-md-0" v-for="event in events.slice(0,3)" :key="event.id">
                    <div class="card ">
                    <div class="div-card-image">
                        <img class="card-img" :src="getImageUrl(event.imageUrl)" alt="">
                    </div>
                    <div class="card-body">
                        <div class="card-tile">
                          <h4>{{ event.name }}</h4>
                          <p> {{ event.description.slice(0,50) }}..</p>
                        </div>
                        <a class="card-link" :href="getEventUrl(event.id)">Show More <i class="ti-arrow-right"></i></a>
                    </div>
                    </div>
                </div>
        </div>
      </div>
    </section><br/>

     <div class="row justify-content-center">
        <div class="col-md-2 show-more">
         <a :href="getEventsUrl()"><button type="button" class="btn btn-warning show-more-button" >Show More</button></a>
        </div>
    </div><br/><br/>

    <section class="section-margin">
      <div class="container">
        <div class="section-intro text-center pb-80px">
          <h2>Nature</h2>
        </div>

        <div class="row">
            <div class="col-md-6 col-lg-4 mb-4 mb-md-0" v-for="sight in sights.slice(0,3)" :key="sight.id">
                    <div class="card ">
                    <div class="div-card-image">
                        <img class="card-img" :src="getImageUrl(sight.imageUrl)" alt="">
                    </div>
                    <div class="card-body">
                        <div class="card-tile">
                         <h4> {{ sight.name }}</h4>
                         {{ sight.description.slice(0,60) }}
                          </div>
                        <a class="card-link" :href="getsightUrl(sight.id)">Show More <i class="ti-arrow-right"></i></a>
                    </div>
                    </div>
                </div>
        </div>
      </div>
    </section><br/><br/>
    <div class="row justify-content-center">
        <div class="col-md-2 show-more">
         <a :href="getSightsUrl()"><button type="button" class="btn btn-warning show-more-button" >Show More</button></a>
        </div>
    </div><br/><br/>
</template>

<style scoped>
.header {
  position: relative;
  background-color: #343a40;
  background: url("/background.jpg") no-repeat center center;
  background-size: cover;
  padding-top: 8rem;
  padding-bottom: 8rem;
}
a {
  color: white;
}
.md-5 {
  color:white;
  margin-top:100px;
}
.btn {
  color:white;margin-top:25px;width:100%;background-color:#555;
}
.card-explore__title {
  color: black;
}
.card-link {
  color: black;
}
.show-more-button {
  width:300px;height:50px;color:white;background-color:#555;
}

.show-more {
  margin-right:60px;
}
.card-img {
  max-height: 350px;
}
</style>