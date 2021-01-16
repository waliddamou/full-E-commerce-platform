import axios from 'axios';

export const register = newUser => {
    return axios
    .post('/AddUser', {
        first_name: newUser.first_name,
        last_name: newUser.first_name,
        email: newUser.email,
        phone: newUser.phone,
        password: newUser.password,
        birth: newUser.birth
        })
        .then(res =>{
            console.log(res)
        })
}