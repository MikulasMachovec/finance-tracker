
const API_URL = "http://localhost:8080";

export class HttpRequestError extends Error{
    constructor(response){
        super(`Network response was not ok: ${response.status} ${response.statusText}`)
        this.response = response;
    }
}

const fetchData = (url, requestOptions) => {
    const apiUrl = `${API_URL}${url}`;
    const token = localStorage.getItem("accessToken")
    
    const allRequestOptions = {
        credentials: "include",
        ...requestOptions, 
        headers: {
            ...requestOptions.headers,
            ...(token && {Authorization: `Bearer ${token}`}),
        },
        
    };

    return fetch(apiUrl, allRequestOptions)
        .then(async(response) => {
            if (!response.ok) {
                throw new HttpRequestError(response)
            }
            
            const contentType = response.headers.get("content-type");

            if (!contentType || !contentType.includes("application/json")) {
                return null;
            }

            const text = await response.text();
            return text ? JSON.parse(text) : null;
        })
        .catch((error) => {
            throw error;
        })

};

export const apiGet = (url, params = {}) => {
    const filteredParams = Object.fromEntries(
        Object.entries(params)
        .filter(([ _ , value ]) => value != null)
    );

    const query = new URLSearchParams(filteredParams);

    const apiUrl = query.toString()
        ? `${url}?${query}`
        : url;

    const requestOptions = {
        method: "GET",
    };

    return fetchData(apiUrl, requestOptions);
}

export const apiPost = (url, data) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(data),
    }
    return fetchData(url, requestOptions);
}

export const apiPut = (url, data) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(data),
    }
    return fetchData(url, requestOptions);
}
// body part is optional thats why there is spread operator
export const apiPatch = ( url, data) => {
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        ...(data && { body: JSON.stringify(data) }),
    }
    return fetchData(url, requestOptions);
}

export const apiDelete = (url) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type" : "application/json" },
    }
    return fetchData(url, requestOptions);
}