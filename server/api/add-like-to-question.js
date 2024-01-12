import QuestionModel from "~~/server/models/Question";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.qid && params.uid) {
            const filter = { _id: params.qid }

            const likesArr = await QuestionModel.findOne({ qid: params.qid }, { likes: 1 })
            // const likes = likesArr.likes
            if (!likesArr.likes.includes(uid)) {
                likesArr.likes.push(uid)
            } else {
                const index = likesArr.likes.indexOf(params.uid);
                likesArr.likes.splice(index, 1);
            }
            QuestionModel.updateOne(filter, likesArr).exec()
            return;
        }
    } catch (error) { }
})