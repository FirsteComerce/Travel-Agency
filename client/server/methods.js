const axios = require ('axios')
const config=require ('./config.js')

const fetching = async (endpoint) => {
    const url = `${config.url}/${endpoint}`;
    try {
      const response = await axios.get(url);
      console.log('fine');
      return response.data;
    } catch (e) {
      console.error(`Error fetching data: ${e}`);
      throw e;
    }
  };

  module.exports={fetching}