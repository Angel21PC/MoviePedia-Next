import { auth, db, a } from "./index";

export async function getCommentsM(id) {
    let response = undefined; 
    try{
        const docRef = db.collection("comments_M").doc(id.toString());
        await docRef
        .get()
        .then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            response= data
        } else {
            console.log("No such document!");
            db.collection("comments_M").doc(id.toString()).set({
                comments:[],
              }); 
        }
        })
        .catch((error) => {
        console.log("Error getting document:", error);
        });
    }catch{

        // db.collection("comments_M").doc(id.toString()).set({
        //     comments:[],
        //   }); 
    }

  return response;
}

export async function pushNewCommentsM(id:number|string ,text:string) {
  
    try{
        const docRef = db.collection("comments_M").doc(id.toString());
        await docRef
        .get()
        .then((doc) => {
        if (doc.exists) {
            docRef.update({
                comments: a.firestore.FieldValue.arrayUnion({text}),
              });
        } else {
            console.log("No such document!");
        }
        })
        .catch((error) => {
        console.log("Error getting document:", error);
        });
    }catch(e){
        console.log(e)
    }

}

export async function commentLike(id_film:number|string , user_giveLike:string, commentLike:number) {
    let response = undefined;
    try{
        const docRef = db.collection("comments_M").doc(id_film.toString());
        await docRef
        .get()
        .then((doc) => {
        if (doc.exists) {
            let result = doc.data();
            let num_likes = 0;

            result.comments?.map((c) => {
                if (c.id_comment === commentLike) {
                    let nuestro_user_fue_encontrado = false;
                    c.users_like.map((u)=>{
                        if(!u.email){
                            nuestro_user_fue_encontrado == true;
                            response="user encontrado"
                        }
                    })
                    if(nuestro_user_fue_encontrado === false){
                        //añadir like 
                    }else{
                        //eliminar like
                    } 
                }
            });
        } else {
            console.log("No such document!");
        }
        })
        .catch((error) => {
        console.log("Error getting document:", error);
        });
    }catch(e){
        console.log(e)
    }
    return response
}
