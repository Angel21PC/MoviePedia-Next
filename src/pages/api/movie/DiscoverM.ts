import axios, { request as r } from "../../../tmdb/index";

export default async (req, res) => {
  const page: number = req.query.p;
  const g: string = req.query.g;

  try {
    const request = await axios.get(
      r.fetchDiscover_Movie + `&page=${page}&with_genres=` + g
    );
    res.status(200).json({ data: request.data });
  } catch (error) {
    res.status(200).json(error);
  }
};
