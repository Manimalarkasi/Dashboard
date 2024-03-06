
import bcrypt from 'bcrypt';
// import {reject}  from 'bcrypt/promises'

export const hashpassword = (password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(12,(err,salt)=>{
            if(err){
                reject (err);
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
};

export const comparepassword = (password,hashed)=>{
    return bcrypt.compare(password,hashed)
}

