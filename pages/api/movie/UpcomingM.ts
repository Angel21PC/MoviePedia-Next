import axios, {request as r} from '../../../tmdb/index';

export default async (
  req, 
  res
) => {
  
  const page = req.query.p
  // console.log(page)
  try {
    const request = await axios.get(r.fetchUpcoming+`&page=${page}`);
    res.status(200).json({data: request.data})
  } catch (error) {
    res.status(200).json(error)
  }
 
}