export interface LoaderProps {}

const Loader: React.SFC<LoaderProps> = () => {
  return (
    <>
      <span className="loader"></span>
      <style jsx>{`
        .loader {
          width: 100px;
          height: 100px;
          border: 5px solid;
          border-color: #ff3d00 transparent;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;
