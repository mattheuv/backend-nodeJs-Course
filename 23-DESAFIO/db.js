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

    async readMessage() {
        const db = admin.firestore() 
        const query= db.collection("mensajes")
        try{
            const querySnapshot = await query.orderBy("date", "asc").get()
            let docs= querySnapshot.docs;


            const response = docs.data((doc) => (
                doc.data()
                ))
            return response

        } catch(err)
        {
            console.error(err)
        }
    }
}

module.exports = {Firebase}