import axios from 'axios';

export const getEntryList = () => {
  return axios.get('/entries')
              .then(resp => resp.data);
};

export const getFullEntry = entryId => {
  return axios.get(`/entries/${entryId}`)
              .then(resp => resp.data);
};


export const postFile = file => {
  return axios.post('/pictures', file)
              .then(resp => resp.data);
};


export const addEntry = ({location, img, info, name}) => {
  return axios.post('/entries', { location.lat, location.lng, img, info, name, show: false})
              .then(resp => resp.data);

};
