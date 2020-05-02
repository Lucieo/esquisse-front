let apiBaseUrl;

if (process.env.NODE_ENV === "development") {
    apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "localhost:4000/graphql";
} else if (process.env.NODE_ENV === "test") {
    apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
} else {
    apiBaseUrl =
        process.env.REACT_APP_API_BASE_URL ||
        "esquisse-api.herokuapp.com/graphql";
}

const ssl =
    process.env.NODE_ENV === "production" || apiBaseUrl.includes("heroku");
const httpUri = `http${ssl ? "s" : ""}://${apiBaseUrl}`;
const websocketUri = `ws${ssl ? "s" : ""}://${apiBaseUrl}`;

export { apiBaseUrl, ssl, httpUri, websocketUri };
