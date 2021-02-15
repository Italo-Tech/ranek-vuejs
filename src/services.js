import axios from 'axios'

/*Para não ficarmos reescrevendo chamadas api's em cada chamada,
* podemos chamar apenas uma vez e passando a url padrão.
* E nos arquivos que teremos que chamar passamos apenas
* a rota que queremos chamar
* Ex:
* api.get("/product")
*/
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})


//Export axios get api para ListProduct
export const api = {
    get(endpoint) {
        return axiosInstance.get(endpoint);
    },
    post(endpoint, body) {
        return axiosInstance.post(endpoint, body)
    },
    put(endpoint, body) {
        return axiosInstance.put(endpoint, body)
    },
    delete(endpoint) {
        return axiosInstance.delete(endpoint)
    }
};

export function getCep(cep) {
    return axios.get(`http://viacep.com.br/ws/${cep}/json/`)
}