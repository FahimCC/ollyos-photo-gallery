const Header = ({ selectedPhotos, setSelectedPhotos, handleDeletedPhotos }) => {
  return (
    <>
      <div className="flex justify-between items-center mx-4 md:mx-10 my-4">
        <div className="flex gap-2 items-center ">
          {selectedPhotos?.length > 0 && (
            <input
              readOnly
              type="checkbox"
              checked={selectedPhotos?.length ? true : false}
              className=" w-[14px] h-[14px] lg:w-[18px] lg:h-[18px]"
              onChange={() => setSelectedPhotos([])}
            />
          )}
          <p className="font-bold lg:text-xl">
            {/* toggle the Gallery / File / Files */}
            {selectedPhotos?.length > 0 && selectedPhotos?.length}{" "}
            {selectedPhotos?.length === 0
              ? "Gallery"
              : selectedPhotos?.length === 1
              ? "File Selected"
              : "Files Selected"}{" "}
          </p>
        </div>
        <div
          onClick={handleDeletedPhotos}
          className="cursor-pointer squeeze font-semibold text-sm lg:text-base text-red-500 "
        >
          {/* toggle the file / files when at least one photo selected*/}
          {selectedPhotos?.length === 0
            ? ""
            : selectedPhotos?.length === 1
            ? "Delete file"
            : "Delete files"}{" "}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Header;
