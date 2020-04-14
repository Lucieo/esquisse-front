let apiBaseUrl;
const ssl = process.env.NODE_ENV === 'production';

if (process.env.NODE_ENV === 'development') {
    apiBaseUrl = 'localhost:4000/graphql'
} else if (process.env.NODE_ENV === 'test') {
    apiBaseUrl = process.env.API_BASE_URL
} else {
    apiBaseUrl = 'esquisse-api.herokuapp.com/graphql'
}

const httpUri = `http${ssl ? 's' : ''}://${apiBaseUrl}`;
const websocketUri = `ws${ssl ? 's' : ''}://${apiBaseUrl}`;

export {
    apiBaseUrl,
    ssl,
    httpUri,
    websocketUri
}
