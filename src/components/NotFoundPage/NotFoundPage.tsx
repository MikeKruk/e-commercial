import image from '../../assets/not-found.jpg';

const NotFoundPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        height: '100vh',
        backgroundPosition: 'center',
      }}
    >
      {/* <h1 Name="text-lg text-gray-600">Sorry, the requested page was not found.</p> */}
    </div>
  );
};

export default NotFoundPage;
