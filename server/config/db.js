import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.connection.on('Connected', () => {
            console.log('Connected to MongoDB')
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/gpt-db`)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB