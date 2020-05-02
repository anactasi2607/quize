import axios from 'axios';

export default axios.create({
  baseURL: 'https://quiz-42ce7.firebaseio.com/'
})