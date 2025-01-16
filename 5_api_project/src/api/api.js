import axios from 'axios';

const searchImages = async (term) => {
    //async --> bu metod asenkron çalışır, bu yüzden await kullanılır
    // async await --> bu method sayesinde pending durumuna düşmeyiz
    //axios ---> use for api request,calls api
    const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
            Authorization : 'Client-ID 8WyuIYM9sbUMIKXboLQ6N6vCGahbg-zA-7ou7YJIXnI',
        },
        params: {
            query: term,
        },
    });
    debugger;
    return response.data.results;
};

export default searchImages;

