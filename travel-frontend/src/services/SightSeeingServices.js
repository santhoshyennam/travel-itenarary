import apiClient from "./services";

export default {
  getSights() {
    return apiClient.get("sightseeing");
  },
  getSight(id) {
    return apiClient.get("sightseeing/" + id);
  },
  addSight(sight) {
    return apiClient.post("sightseeing", sight);
  },
  updateSight(sight) {
    return apiClient.put("sightseeing/" + sight.id, sight);
  },
  deleteSight(sightId) {
    return apiClient.delete("sightseeing/" + sightId);
  },
};
