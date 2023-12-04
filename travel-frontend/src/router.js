import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/trips",
      name: "trips",
      component: () => import("./views/TripList.vue"),
    },
    {
      path: "/sightseeing",
      name: "sightseeing",
      component: () => import("./views/SightList.vue"),
    },
    {
      path: "/events",
      name: "events",
      component: () => import("./views/EventList.vue"),
    },
    {
      path: "/hotels",
      name: "hotels",
      component: () => import("./views/HotelList.vue"),
    },
    {
      path: "/hotel/:id",
      name: "hotel",
      component: () => import("./views/Hotel.vue"),
    },
    {
      path: "/event/:id",
      name: "event",
      component: () => import("./views/Event.vue"),
    },
    {
      path: "/sight/:id",
      name: "sight",
      component: () => import("./views/Sight.vue"),
    },
    {
      path: "/trip/:id",
      name: "trip",
      component: () => import("./views/Trip.vue"),
    },
    {
      path: "/bookings",
      name: "bookings",
      component: () => import("./views/Bookings.vue"),
    },
    {
      path: "/add-itenarary",
      name: "add-itenarary",
      component: () => import("./views/AddItenarary.vue"),
    },
    {
      path: "/edit-itenarary/:id",
      name: "edit-itenarary",
      component: () => import("./views/EditItenarary.vue"),
    },
    {
      path: "/add-day",
      name: "add-day",
      component: () => import("./views/AddDay.vue"),
    },
  ],
});

export default router;
