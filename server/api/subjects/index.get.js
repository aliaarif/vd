import SubjectModel from "~~/server/models/Subject";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        return SubjectModel.find({ status: 'Active' })
    } catch (error) {
        console.log(error)
    }
})