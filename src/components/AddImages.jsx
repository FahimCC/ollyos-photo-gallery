const AddImages = ({handleAddPhoto}) => {
  return (
    <>
      <div className="aspect-square  cursor-pointer smooth rounded-lg border-2 border-[#c9cbcf] border-dashed bg-[#f9f9f9]">
        <label className="squeeze smooth flex flex-col items-center justify-center gap-1 lg:gap-4 h-full">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1.5em"
            width="1.5em"
            xmlns="http:www.w3.org/2000/svg"
          >
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
          </svg>
          <p className="font-semibold text-center text-sm  md:text-base">
            Add Images
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
            onChange={handleAddPhoto}
          />
        </label>
      </div>
    </>
  );
};

export default AddImages;
