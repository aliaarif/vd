import SubjectModel from "~~/server/models/Subject";
import QuestionModel from "~~/server/models/Question";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.slug) {
            const subject = SubjectModel.findOne({ slug: params.slug }, { _id: 1, name: 1 })
            return subject
        } else {
            const question = await QuestionModel.aggregate([
                { $match: { subject_id: params.id } },
                { $sample: { size: 1 } }
            ])
            return question[0] ?? {}
        }
    } catch (error) { }
})