const { response } = require("express");
var admin = require("firebase-admin");
var serviceAccount = require("./keys/dbkey.json");



class Firebase {
    
    connectDB(){
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://typo-ecommerce.firebaseio.com"
        });
    }

    async createMessage(obj) {
        const db = admin.firestore() 
        const query= db.collection("mensajes")

        try{
            const doc = query.doc()
            await doc.create(obj)
        }catch(err)
        {
            console.error(err)
        }
    }

    async findUser(user, req, res){
        const db = admin.firestore() 
        db.collection("users").where("user", "==", user)
        .get()
        .then(function(querySnapshot){
            if(querySnapshot.size > 0)
            querySnapshot.forEach(function(doc) {
            // res.json(doc.data())
            res.redirect("/vista")
            })
            else
            res.redirect("/password-invalid")       
        })
        .catch(function(error){
            res.send("Error por", error)
        })
    }

    async readMessage() {
        const db = admin.firestore() 
        const query= db.collection("mensajes")
        try{
            const querySnapshot = await query.orderBy("date", "asc").get()
            let docs= querySnapshot.docs;


            const response = docs.map((doc) => ({
                id: doc.id,
                Author: {
                    id: doc.data().Author.id,
                    name: doc.data().Author.name,
                    lastname: doc.data().Author.lastname,
                    Age:doc.data().Author.age,
                    Alias: doc.data().Author.Alias,
                    Avatar: doc.data().Author.Avatar
                },
                date: doc.data().date,
                text: doc.data().text
            }))
            return response

        } catch(err)
        {
            console.error(err)
        }
    }
}

module.exports = {Firebase}