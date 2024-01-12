import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: false, trim: true },
    image: { type: String, required: false, trim: true },
    page_title: { type: String, required: false, trim: true },
    page_content: { type: String, required: false, trim: true },
    status: { type: String, required: false, trim: true },
    created_by: { type: String, required: false, trim: true },
    updated_by: { type: String, required: false, trim: true }
})
subjectSchema.set('timestamps', true)
const SubjectModel = mongoose.model('Subject', subjectSchema)
export default SubjectModel