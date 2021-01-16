import axois from 'axios' ;

export const addtype = type => {
     return axois
     .post('http://151.80.56.201:5000/Dashboard/AddType', {
        name : type.name,
        mother_name : type.mother_name,
        subcategorie : type.subcategorie
     }).then(res =>{
         console.log(res.data)
         return res.data
     }).catch(err =>{
         console.log(err)
     })
}