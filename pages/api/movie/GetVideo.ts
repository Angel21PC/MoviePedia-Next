import axios, { request as r } from "../../../tmdb/index";

export default async (req, res) => {
  const id: string = req.query.id;

  try {
    const request = await axios.get(
      r.fetchVideo_Movie.replace("{movie_id}", id)
    );
    //console.log(request)
    res.status(200).json({ data: request.data });
  } catch (error) {
    res.status(200).json(error);
  }
};
