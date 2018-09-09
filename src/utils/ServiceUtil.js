function getGenres(successCb, errorCb) {
    fetch("/api/genres",{
        accept: 'application/json'
    })
    .then(checkForSuccess)
    .then((response)=>{return response.json()})
    .then(successCb)
    .catch((error) => errorCb(error));
}

function checkForSuccess(response) {
    if(response.status >= 200 || response <= 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
}

const ServiceUtil = { getGenres };
export default ServiceUtil;