
export const domainUrl = "http://ec2-3-85-3-27.compute-1.amazonaws.com/travel-frontend/"
// export const domainUrl = "http://localhost:8081/"
export const getImageUrl = (path) => { 
    return "http://ec2-3-85-3-27.compute-1.amazonaws.com/travel-frontend/"+"media/"+path 
}


export const getTripUrl = (id) => {
    return domainUrl+"trip/"+id
}

export const getEditTrip = (id) => {
    return domainUrl+"edit-itenarary/"+id
}

export const getEventUrl = (id)=>{
    return domainUrl+"event/"+id
}

export const getsightUrl = (id)=>{
    return domainUrl+"sight/"+id
}

export const gethotelUrl = (id)=>{
    return domainUrl+"hotel/"+id
}
export const getHotelsUrl = ()=> {
  return domainUrl+"hotels"
}
export const getEventsUrl = ()=> {
  return domainUrl+"events"
}
export const getSightsUrl = ()=> {
  return domainUrl+"sightseeing"
}
