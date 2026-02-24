import { useAppContext } from "../context/AppContext";

const AllVideos = () => {
  const { videos = [], deleteVideo } = useAppContext();

  return (
    <div className="p-4 md:p-6 w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        All Videos
      </h1>

      {/* EMPTY STATE */}
      {videos.length === 0 && (
        <p className="text-gray-500 text-center">No videos found</p>
      )}

      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {videos.map((video) => {
          console.log("Thumbnail URL:", `http://localhost:5000/uploads/thumbnails/${video.thumbnail}`);

          return (
            <div
              key={video._id}
              className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition"
            >
              {/* THUMBNAIL WITH PLAY BUTTON */}
              <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-48 rounded overflow-hidden">
                <img
                  src={`http://localhost:5000/uploads/thumbnails/${video.thumbnail}`}
                  alt={video.title}
                  className="w-full h-full object-cover rounded"
                />

                {/* PLAY BUTTON OVERLAY */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-3 sm:p-4 cursor-pointer hover:bg-opacity-70 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.752 11.168l-6.518-3.76A1 1 0 007 8.32v7.36a1 1 0 001.234.97l6.518-1.884a1 1 0 00.748-.97v-2.64a1 1 0 00-.748-.97z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* TITLE */}
              <h2 className="font-bold mt-3 text-md sm:text-lg md:text-base lg:text-lg truncate">
                {video.title || "No Title"}
              </h2>

              {/* PLAN TYPE */}
              <p className="font-bold text-gray-700 text-sm sm:text-base mt-1">
                Plan: {video.subscription}
              </p>

              {/* DELETE BUTTON */}
              <div className="flex gap-2 mt-3 justify-start">
                <button
                  onClick={() => deleteVideo(video._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllVideos;
