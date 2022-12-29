const { response } = require("express");
const User = require("./schemas/user.schema")
const mongoose = require("mongoose")
 


class Mongo {
    
    connectDB() {

        console.log("soy atlas")
    
        try{
           mongoose.connect("mongodb+srv://coladmin:mosorio12@cluster0.kduye.mongodb.net/desafio26?retryWrites=true&w=majority",
             {
                 useNewUrlParser: true,
                 useUnifiedTopology: true
             }
         );
         console.log('Database connected')
    
        }
        catch(error){
            throw new Error(error)
        }
    }

    // async createMessage(obj) {
    //     const db = admin.firestore() 
    //     const query= db.collection("mensajes")

    //     try{
    //         const doc = query.doc()
    //         await doc.create(obj)
    //     }catch(err)
    //     {
    //         console.error(err)
    //     }
    // }

    async findUser(user, req, res){
        const userSaved = await User.findOne({user: req.body.user})
        return userSaved
        // if(userSaved) {
        //     res.redirect("/vista")
        // }else{
        //     res.redirect("/password-invalid")       
        // }
    }

    // async readMessage() {
    //     const db = admin.firestore() 
    //     const query= db.collection("mensajes")
    //     try{
    //         const querySnapshot = await query.orderBy("date", "asc").get()
    //         let docs= querySnapshot.docs;


    //         const response = docs.map((doc) => ({
    //             id: doc.id,
    //             Author: {
    //                 id: doc.data().Author.id,
    //                 name: doc.data().Author.name,
    //                 lastname: doc.data().Author.lastname,
    //                 Age:doc.data().Author.age,
    //                 Alias: doc.data().Author.Alias,
    //                 Avatar: doc.data().Author.Avatar
    //             },
    //             date: doc.data().date,
    //             text: doc.data().text
    //         }))
    //         return response

    //     } catch(err)
    //     {
    //         console.error(err)
    //     }
    // }
}

module.exports = {Mongo}