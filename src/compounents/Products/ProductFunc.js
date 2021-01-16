import axois from 'axios' ;

export const addproduct = product => {
     return axois
     .post('/Dashboard/AddProduct', {
        name : product.name,
        descrption: product.descrption,
        subcategorie : product.subcategorie,
        mother_name : product.mother_name,
        qte : product.qte,
        qtea : product.qtea,
        buyprice : product.buyprice,
        sellprice : product.sellprice,
        photos: product.photos
        

     }).then(res =>{
         console.log(res.data)
         return res.data
     }).catch(err =>{
         console.log(err)
     })
}