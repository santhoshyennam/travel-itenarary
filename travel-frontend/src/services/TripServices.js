import apiClient from "./services";

export default {
  getTrips(params) {
    return apiClient.get("trips", {
      params: params,
    });
  },
  getTrip(id) {
    return apiClient.get("trips/" + id);
  },
  addTrip(trip) {
    return apiClient.post("trips", trip);
  },
  updateTrip(trip) {
    return apiClient.put("trips/" + trip.id, trip);
  },
  deleteTrip(tripId) {
    return apiClient.delete("trips/" + tripId);
  },
  // Get all latest itineraries
  getLatestTrips() {
    return apiClient.delete("trips/special/latest");
  },
  getHighRatedTrips() {
    return apiClient.delete("trips/special/high-rated");
  },
  getPlanOfTrip(tripId) {
    return apiClient.delete("trips/special/"+tripId+"/plan");
  },
  getDayDetailsOfTrip(tripId,dayId) {
    return apiClient.get("trips/"+tripId+"/days/"+dayId);
  },
  addDay(day) {
    return apiClient.post("trips/addDay", day);
  },
};