import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {
  const galleryPhotos = [
    {
      id: "1",
      image: "../src/assets/images/image-1.webp",
      order: 1,
    },
    {
      id: "2",
      image: "../src/assets/images/image-2.webp",
      order: 2,
    },
    {
      id: "3",
      image: "../src/assets/images/image-3.webp",
      order: 3,
    },
    {
      id: "4",
      image: "../src/assets/images/image-4.webp",
      order: 4,
    },
    {
      id: "5",
      image: "../src/assets/images/image-5.webp",
      order: 5,
    },
    {
      id: "6",
      image: "../src/assets/images/image-6.webp",
      order: 6,
    },
    {
      id: "7",
      image: "../src/assets/images/image-7.webp",
      order: 7,
    },
    {
      id: "8",
      image: "../src/assets/images/image-8.webp",
      order: 8,
    },
    {
      id: "9",
      image: "../src/assets/images/image-9.webp",
      order: 9,
    },
    {
      id: "10",
      image: "../src/assets/images/image-10.jpeg",
      order: 10,
    },
    {
      id: "11",
      image: "../src/assets/images/image-11.jpeg",
      order: 11,
    },
  ];

  const [selectedPhotos, setSelectedPhotos] = useState([]);
  let [photos, setPhotos] = useState(galleryPhotos);

  const handleSelectedPhotos = (id) => {
    const isPhotoExist = selectedPhotos?.find((photo) => photo == id);
    console.log(isPhotoExist);
    if (!isPhotoExist) {
      setSelectedPhotos((prev) => [...prev, id]);
    } else {
      const remainingPhotos = selectedPhotos?.filter((photo) => photo != id);
      setSelectedPhotos(remainingPhotos);
    }
  };

  const handleDeletedPhotos = () => {
    const remainingPhotos = photos?.filter(
      (photo) => !selectedPhotos.includes(photo?.id)
    );
    setPhotos(remainingPhotos);
    setSelectedPhotos([]);
  };

  const handleDnd = async (results) => {
    const { source, destination, type } = results;
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
      let reorderedPhotos;
      (reorderedPhotos = await Promise.all(
        reorderedStores.map((photo, index) => {
          return { ...photo, Order: index };
        })
      )),
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
                {selectedPhotos?.length === 0
                  ? ""
                  : selectedPhotos?.length === 1
                  ? "Deleted file"
                  : "Deleted files"}{" "}
              </div>
            </div>
            <hr />
            <DragDropContext onDragEnd={handleDnd}>
              <div className="p-4 md:p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                {photos?.map((photo, index) => (
                  <Droppable key={index} droppableId="ROOT" type="group">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${index === 0 && "col-span-2 row-span-2"}`}
                      >
                        <Draggable draggableId={photo?.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <label className={` relative `}>
                                <div
                                  className={` smooth rounded-lg ${
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
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
                {/* <div
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
                </div> */}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
