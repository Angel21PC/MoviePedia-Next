export default function Custom404() { 
    return (
    <>
        <div className='w-100 d-flex justify-content-center miss vertical-center'>
            <h1 className='title'>404 - Page Not Found</h1>
        </div>

        <video className='myVideo' autoPlay loop muted id="myVideo">
            <source src='https://media.giphy.com/media/yPRo73ILrGjny/giphy.mp4' type="video/mp4" />
        </video>
       
        <style jsx>{`
        .myVideo {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            top: 0;
            z-index: 0;
            left: 0;
            right: 0;
            z-index:1;
          }
          .miss{
              z-index:3;
              position:absolute; 
          }
          .title{
            font-size: 100px;
            color: white;
          }
      `}</style>
    </>
    )
}