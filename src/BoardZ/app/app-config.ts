
export class Configuration {
    apiEndpoint: string;
}

export class ApplicationConfiguration extends Configuration {
    apiEndpoint: string = 'http://localhost:50464/';
}