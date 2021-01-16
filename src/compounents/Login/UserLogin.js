import axios from 'axios';

export const login = user => {
    return axios
    .post('/login', {
        email: user.email,
        password: user.password
    })
    .then(res =>{
        localStorage.setItem('usertoken',res.data.token)
        return res.data
    })
    .catch(err =>{
        console.log(err)
    })
}