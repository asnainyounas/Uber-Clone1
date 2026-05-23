const dotenv=require('dotenv')
dotenv.config()

   if(!process.env.MONGO_DB_URI){
        throw new Error('MONGO_DB_URI is not defined')
    }

    if(!process.env.JWT_ACCESS_TOKEN){
        throw new Error('JWT_ACCESS_TOKEN is not defined')
    }

    if(!process.env.JWT_REFRESH_TOKEN){
        throw new Error('JWT_REFRESH_TOKEN is not defined')
    }
    
    if(!process.env.GOOGLE_CLIENT_ID){
        throw new Error('GOOGLE_CLIENT_ID is not defined')
    }

    if(!process.env.GOOGLE_CLIENT_SECRET){
        throw new Error('GOOGLE_CLIENT_SECRET is not defined')
    }

    if(!process.env.GOOGLE_REFRESH_TOKEN){
        throw new Error('GOOGLE_REFRESH_TOKEN is not defined')
    }

    if(!process.env.GOOGLE_USER){
        throw new Error('GOOGLE_USER is not defined')
    }

    

const config={
    MONGO_DB_URI:process.env.MONGO_DB_URI,
    JWT_ACCESS_TOKEN:process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN:process.env.JWT_REFRESH_TOKEN,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN:process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER:process.env.GOOGLE_USER
}

module.exports=config