import axios from 'axios';

export const getEntryList = () => {
  return axios.get('http://ec2-54-183-96-28.us-west-1.compute.amazonaws.com/entries')
    .then(resp => {
      return resp.data;
    })
    .catch(err => console.log(err));
};

export const getFullEntry = entryId => {
  return axios.get(`http://ec2-54-183-96-28.us-west-1.compute.amazonaws.com/entries/${entryId}`)
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
  return axios.post('http://ec2-54-183-96-28.us-west-1.compute.amazonaws.com/entries', { lat: location.lat, lng: location.lng, image, info, name, show: false })
    .then(resp => resp.data)
    .catch(err => console.log(err));

};
