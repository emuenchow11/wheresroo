import axios from 'axios';

export const getEntryList = () => {
  return axios.get('/entries')
    .then(resp => {
      return resp.data;
    })
    .catch(err => console.log(err));
};

export const getFullEntry = entryId => {
  return axios.get(`/entries/${entryId}`)
    .then(resp => resp.data)
    .catch(err => console.log(err));
};

/*
export const postFile = file => {
  return axios.post('/pictures', file)
    .then(resp => resp.data)
    .catch(err => console.log(err));
};

*/
export const addEntry = ({ location, image, info, name }) => {
  return axios.post('/entries', { lat: location.lat, lng: location.lng, image, info, name, show: false })
    .then(resp => resp.data)
    .catch(err => console.log(err));

};
