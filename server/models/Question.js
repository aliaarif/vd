import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
    qid: { type: String, required: false, trim: false },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    subject_id: { type: String, required: true, trim: true },
    options: { type: Array, required: true, trim: true },
    correct: { type: String, required: true, trim: true },
    rational: { type: String, required: true, trim: true },
    visit_counts: { type: String, required: true, trim: true },
    share_counts: { type: String, required: true, trim: true },
    likes: { type: Array, required: false, trim: true },
    page_title: { type: String, required: false, trim: true },
    page_content: { type: String, required: false, trim: true },
    status: { type: String, required: false, trim: true },
    created_by: { type: String, required: false, trim: true },
    updated_by: { type: String, required: false, trim: true }
})
questionSchema.set('timestamps', true)
const QuestionModel = mongoose.model('Question', questionSchema)
export default QuestionModel
