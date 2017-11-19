const config = require('./../config.json')

export class MoviesApi {

    static requestHeaders() {
        return {
            'Authorization': config.apiPassword,
            'Content-Type': 'application/json'
        }
    }

    static fetchWrapper(method, id = '', movie = undefined) {
        const headers = this.requestHeaders();
        let url = `${config.apiBaseUrl}/movies`;
        url += id ? '/' + id : '';

        const request = new Request(url, {
            method: method,
            headers: headers,
            body: movie ? JSON.stringify({ movie: movie }) : undefined,
        });

        return fetch(request)
            .then(response => response.json())
            .catch(error => console.error);
    }

    static getMovies() {
        return this.fetchWrapper('GET')
            .then(movies => movies.sort((a, b) => a.title.localeCompare(b.title)))
    }

    static deleteMovie(movie) {
        return this.fetchWrapper('DELETE', movie._id)
    }

    static addMovie(movie) {
        return this.fetchWrapper('PUT', '', movie)
    }

    static updateMovie(movie) {
        return this.fetchWrapper('PATCH', movie._id, movie)
    }

}