import axios, {request as r} from '../../../tmdb/index';

export default async (
  req, 
  res
) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  const text:string = req.query.text

  try {
    const request = await axios.get(r.fetchFindMovie.concat(`&query=`+text));
    res.status(200).json({data: request.data})
  } catch (error) {
    res.status(200).json(error)
  }
 
}