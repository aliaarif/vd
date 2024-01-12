import CityModel from "~~/server/models/City";
export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.name) {
            return CityModel.findOne({ name: params.name }, { state: 1, _id: 0 })
        }
    } catch (error) { }
})