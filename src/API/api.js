import * as axios from "axios";
const instance = axios.create({
    baseURL: 'https://emphasoft-test-assignment.herokuapp.com/',
})

export const usersAPI = {
    getUsers(token) {
        return instance.get(`/api/v1/users/`, {headers:{"Authorization": "Token " + token}});
    },
    createUser(token, values) {
        console.log("Create API values", values)
        return instance.post(`/api/v1/users/`, {...values}, {headers:{"Authorization": "Token " + token}});
    },
    readUser(token, id) {
        console.log("Read API id", id)
        return instance.get(`/api/v1/users/${id}`, {headers:{"Authorization": "Token " + token}});
    },
    updateUser(token, values, id) {
        console.log("Update API values", values)
        return instance.put(`/api/v1/users/${id}/`, values, {headers:{"Authorization": "Token " + token, "Content-Type": "application/json"}});
    },
    patchUser(token, values, id) {
        console.log("Patch API values", values)
        return instance.patch(`/api/v1/users/${id}/`, values, {headers:{"Authorization": "Token " + token}});
    },
    deleteUser(token, id) {
        return instance.delete(`/api/v1/users/${id}`, {headers:{"Authorization": "Token " + token}});
    }
}


export const authAPI = {
    login(username, password) {
        return instance.post(`/api-token-auth/`, {username, password});
    }
}