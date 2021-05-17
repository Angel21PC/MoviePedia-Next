import { auth, db, a } from "./index";
import { v5 as uuidv5 } from "uuid";
import { v1 as uuidv1 } from 'uuid';

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

export async function pushNewCommentsM(id:number|string ,text:string, user_email:string) {

    const today = new Date();
    const comb = [id, text, user_email,today]
    // const id_coment = uuidv5(comb,uuidv5.URL);
 
    const id_coment= uuidv1();

    const dataComent = {
        text: text,
        id_coment: id_coment,
        user: auth.currentUser.email
    }
    const newComent = {
        data: dataComent,
        userLikes: []
    }
    if(auth.currentUser !== null){
        try{
            const docRef = db.collection("comments_M").doc(id.toString());
            await docRef
            .get()
            .then((doc) => {
            if (doc.exists) {
                docRef.update({
                    comments: a.firestore.FieldValue.arrayUnion({newComent}),
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
  
   
}

export async function commentLike(id_film: number|string , user_giveLike:string, commentLike:string) {
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
                
                if (c.newComent.data.id_coment == commentLike) {
                    response='c'
                   
                            let nuestro_user_fue_encontrado = false;
                            c.newComent.userLikes?.map((u)=>{
                            
                                if(u === user_giveLike){
                                    
                                    nuestro_user_fue_encontrado = true;
                                }
                                response =  nuestro_user_fue_encontrado;
                            })
                            if(nuestro_user_fue_encontrado === false){
                                //añadir like
                              
                                docRef.update({
                                    comments: a.firestore.FieldValue.arrayUnion({newComent: c.newComent}),
                                  });
                    
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
        console.log("F:", error);
        });
    }catch(e){
        console.log(e)
    }
    return response
}
