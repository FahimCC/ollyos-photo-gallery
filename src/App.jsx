import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import img1 from "./assets/images/image-1.webp";
import img2 from "./assets/images/image-2.webp";
import img3 from "./assets/images/image-3.webp";
import img4 from "./assets/images/image-4.webp";
import img5 from "./assets/images/image-5.webp";
import img6 from "./assets/images/image-6.webp";
import img7 from "./assets/images/image-7.webp";
import img8 from "./assets/images/image-8.webp";
import img9 from "./assets/images/image-9.webp";
import img10 from "./assets/images/image-10.jpeg";
import img11 from "./assets/images/image-11.jpeg";

const App = () => {
  const galleryPhotos = [
    {
      id: "1",
      image: img1,
      order: 1,
    },
    {
      id: "2",
      image: img2,
      order: 2,
    },
    {
      id: "3",
      image: img3,
      order: 3,
    },
    {
      id: "4",
      image: img4,
      order: 4,
    },
    {
      id: "5",
      image: img5,
      order: 5,
    },
    {
      id: "6",
      image: img6,
      order: 6,
    },
    {
      id: "7",
      image: img7,
      order: 7,
    },
    {
      id: "8",
      image: img8,
      order: 8,
    },
    {
      id: "9",
      image: img9,
      order: 9,
    },
    {
      id: "10",
      image: img10,
      order: 10,
    },
    {
      id: "11",
      image: img11,
      order: 11,
    },
  ];

  const [selectedPhotos, setSelectedPhotos] = useState([]);
  let [photos, setPhotos] = useState(galleryPhotos);

  //!  handle selected and unselected photo/photos
  const handleSelectedPhotos = (id) => {
    //* check the selected photo is already selected or not
    const isPhotoExist = selectedPhotos?.find((photo) => photo == id);
    console.log(isPhotoExist);
    if (!isPhotoExist) {
      //* set selected photos
      setSelectedPhotos((prev) => [...prev, id]);
    } else {
      //* check & set the unselected photos
      const remainingPhotos = selectedPhotos?.filter((photo) => photo != id);
      setSelectedPhotos(remainingPhotos);
    }
  };

  //!  handle delete selected photo/photos
  const handleDeletedPhotos = () => {
    //* filtering for selected photo/photos to delete
    const remainingPhotos = photos?.filter(
      (photo) => !selectedPhotos.includes(photo?.id)
    );
    //* set the remaining photos
    setPhotos(remainingPhotos);
    //* set the selected photos empty
    setSelectedPhotos([]);
  };

  //TODO:
  const handleDnd = async (results) => {
    const { source, destination, type } = results;
    console.log(source, destination, type);
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reorderedStores = [...photos];
      const storeSourceIndex = source.index;
      const storeDestinationIndex = destination.index;
      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinationIndex, 0, removedStore);
      const reorderedPhotos = await Promise.all(
        reorderedStores.map((photo, index) => {
          return { ...photo, Order: index };
        })
      );
      console.log(reorderedPhotos);
      setPhotos(reorderedPhotos);
      console.log("reorderedPhotos::: ", await reorderedPhotos);
    }
  };

  // const handleDnd = (results) => {
  //   const { source, destination, type } = results;
  //   console.log(source, destination, type);
  //   if (!destination) return;
  //   if (
  //     source.droppableId === destination.droppableId &&
  //     source.index === destination.index
  //   )
  //     return;
  //   if (type === "group") {
  //     const reorderedStores = [...photos];
  //     const [movedItem] = reorderedStores.splice(source.index, 1);
  //     reorderedStores.splice(destination.index, 0, movedItem);

  //     const reorderedPhotos = reorderedStores.map((photo, index) => ({
  //       ...photo,
  //       order: index + 1,
  //     }));

  //     setPhotos(reorderedPhotos);
  //   }
  // };

  return (
    <>
      <div className="bg-slate-100 h-full font-openSans">
        <div className="container py-10">
          <div className="bg-white rounded-lg  border">
            <div className="flex justify-between items-center mx-4 md:mx-10 my-4">
              <div className="flex gap-2 items-center ">
                {selectedPhotos?.length > 0 && (
                  <input
                    readOnly
                    type="checkbox"
                    checked={true}
                    className=" w-[14px] h-[14px] lg:w-[18px] lg:h-[18px]"
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
                  ? "Deleted file"
                  : "Deleted files"}{" "}
              </div>
            </div>
            <hr />
            {/* //TODO:  */}
            <DragDropContext onDragEnd={handleDnd}>
              <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="p-4 md:p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6"
                  >
                    {photos?.map((photo, index) => (
                      <Draggable
                        key={index}
                        draggableId={photo?.id}
                        index={photo?.order - 1}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${
                              photo.order === 1 && "col-span-2 row-span-2"
                            }`}
                          >
                            <label className="relative">
                              {console.log("photo?.id", photo?.id)}
                              <div
                                className={`smooth rounded-lg ${
                                  selectedPhotos?.includes(photo?.id)
                                    ? "opacity-50"
                                    : "hover:bg-zinc-500"
                                }`}
                              >
                                <img
                                  className="w-full h-full rounded-lg border-2 border-[#c9cbcf] mix-blend-multiply	"
                                  src={photo.image}
                                  alt={`image-${index}`}
                                />
                              </div>
                              <div className="">
                                <input
                                  type="checkbox"
                                  name="gender"
                                  id={photo.id}
                                  value={photo.id}
                                  className={` ${
                                    selectedPhotos?.includes(photo.id)
                                      ? "block"
                                      : "hover:block hidden"
                                  }   lg:mr-8 w-[14px] h-[14px] lg:w-[18px] lg:h-[18px] cursor-pointer accent-primary absolute top-[14px] left-[14px]  md:top-[18px] md:left-[18px]`}
                                  onChange={() =>
                                    handleSelectedPhotos(photo.id)
                                  }
                                />
                              </div>
                            </label>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <div
                      className={` cursor-pointer smooth rounded-lg border-2 border-[#c9cbcf] border-dashed bg-[#f9f9f9] h-full py-8 md:py-10`}
                    >
                      <div className="squeeze smooth flex flex-col items-center justify-center gap-1 lg:gap-4 h-full">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1.5em"
                          width="1.5em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
                        </svg>
                        <p className="font-semibold text-center text-sm  md:text-base">
                          Add Images
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
