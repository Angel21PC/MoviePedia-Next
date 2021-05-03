import axios, {request as r} from '../../../tmdb/index';
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY: string  = "500227baa19f807d55e74a0220354602";
export default async (
  req, 
  res
) => {
  const text:string = req.query.text

  // try {
  //   const request = await axios.get(r.fetchFindMovie.concat(`&query=`+text));
  //   res.status(200).json({data: request.data})
  // } catch (error) {
  //   res.status(200).json(error)
  // }
 
  return fetch(
    `${BASE_URL}search/multi?api_key=${API_KEY}&include_adult=true&query=${text}`
  ).then((res) => res.json());
}