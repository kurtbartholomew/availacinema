function getGenres(successCb, errorCb) {
    return fetch("/api/genres",{
        accept: 'application/json'
    })
    .then(checkForSuccess)
    .then((response)=>{return response.json()})
    .then(successCb)
    .catch((error) => errorCb(error));
}

function submitSubscription(contactOptions, successCb, errorCb) {
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    return fetch("/api/user",{
        accept: 'application/json',
        method: 'POST',
        headers,
        body: JSON.stringify(contactOptions)
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

const ClientService = {
    getGenres,
    submitSubscription 
};
export default ClientService;