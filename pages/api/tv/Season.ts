import axios, { request as r } from "../../../tmdb/index";

export default async (req, res) => {
  const id: string = req.query.id;
  const season: string = req.query.season;
  const idObj = JSON.parse(id);
  const idObj2 = JSON.parse(season);
  try {
    let url = r.fetchOne_Tv.replace("{tv_id}", idObj.id);
    let urlReady = url.replace("{season_number}", idObj2.season);
    const request = await axios.get(urlReady);
    res.status(200).json({ data: request.data });
  } catch (error) {
    res.status(200).json(error);
  }
  console.log(idObj);
};
