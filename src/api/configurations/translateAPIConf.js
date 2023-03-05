import axios from "axios";

export const translateAPI = (from, to, text) => {
    const options = {
        method: 'GET',
        url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
        params: {langpair: `${from}|${to}`, q: text, mt: '1', onlyprivate: '0', de: 'a@b.c'},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
        }
      };
    return axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
        return false;
    });
}
