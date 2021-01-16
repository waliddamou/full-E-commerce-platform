import axois from 'axios' ;

export const add = categorie => {
     return axois
     .post('/Dashboard/AddCategory',headers: {
        'Content-Type': "multipart/form-data",
        'Authorization': "Bearer " +localStorage.getItem('usertoken')
    }, {
        name : categorie.name,
        color:categorie.color
     }).then(res =>{
         console.log(res.data)
         return res.data
     }).catch(err =>{
         console.log(err)
     })
}