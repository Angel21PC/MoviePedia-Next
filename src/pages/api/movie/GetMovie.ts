import axios, { request as r } from "../../../tmdb/index";

export default async (req, res) => {
  const id: string = req.query.id;
  const idObj = JSON.parse(id);

  try {
    const request = await axios.get(
      r.fetchOne_Movie.replace("{movie_id}", idObj.id)
    );
    res.status(200).json({ data: request.data });
  } catch (error) {
    res.status(200).json(error);
  }
};
