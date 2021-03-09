import axios from "axios";

export default async (req, res) => {
    const {alias} = req.body
    const response = await axios.get(`http://worldtimeapi.org/api/timezone/Europe/${alias}.json`)
    res.json({data: response.data.utc_datetime,offset:response.data.utc_offset})
}
