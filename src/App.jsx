import { useRef, useState } from "react";
import img1 from "./assets/images/image-1.webp";
import img2 from "./assets/images/image-2.webp";
import img3 from "./assets/images/image-3.webp";
import img4 from "./assets/images/image-4.webp";
import img5 from "./assets/images/image-5.webp";
import img6 from "./assets/images/image-6.webp";
import img7 from "./assets/images/image-7.webp";
import img8 from "./assets/images/image-8.webp";
import img9 from "./assets/images/image-9.webp";
import img10 from "./assets/images/image-10.webp";
import img11 from "./assets/images/image-11.webp";
import Header from "./components/Header";
import AddImages from "./components/AddImages";

const App = () => {
  const galleryPhotos = [
    {
      id: "1",
      image: img1,
    },
    {
      id: "2",
      image: img2,
    },
    {
      id: "3",
      image: img3,
    },
    {
      id: "4",
      image: img4,
    },
    {
      id: "5",
      image: img5,
    },
    {
      id: "6",
      image: img6,
    },
    {
      id: "7",
      image: img7,
    },
    {
      id: "8",
      image: img8,
    },
    {
      id: "9",
      image: img9,
    },
    {
      id: "10",
      image: img10,
    },
    {
      id: "11",
      image: img11,
    },
  ];

  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [photos, setPhotos] = useState(galleryPhotos);

  let [reOrderedPhotos, setReOrderedPhotos] = useState([]);
  const [isDragEnd, setIsDragEnd] = useState(true);

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
    //  * filtering for selected photo/photos to delete
    const remainingPhotos = photos?.filter(
      (photo) => !selectedPhotos.includes(photo?.id)
    );
    //  * set the remaining photos
    setPhotos(remainingPhotos);
    //  * set the selected photos empty
    setSelectedPhotos([]);
  };

  const source = useRef(null);
  const destination = useRef(null);

  //! to check source
  const handleDragStart = (e, index) => {
    source.current = index;
  };

  //! to check destination
  const handleDragEnter = (e, index) => {
    destination.current = index;
    console.log("source - destination : ", source, destination);

    let reOrder = [...photos];

    //*  remove and save the dragged item content
    const sourceContent = reOrder.splice(source.current, 1)[0];

    //*  switch the position
    reOrder.splice(destination.current, 0, sourceContent);

    setReOrderedPhotos([...reOrder]);
    setIsDragEnd(false);
  };

  //! handle drag sorting
  const handleDragEnd = () => {
    if (source.current !== destination.current) {
      //*  update the actual array
      setPhotos([...reOrderedPhotos]);
    }
    setIsDragEnd(true);

    // console.log(reOrderedPhotos);

    //*  reset the position ref
    source.current = null;
    destination.current = null;
  };

  //! added multiple photos
  const handleAddPhoto = (e) => {
    const addPhotos = e.target.files;

    const newPhotos = Array.from(addPhotos).map((file, index) => {
      const id = photos.length + index + 1;
      //* create a photo path
      const photo = URL.createObjectURL(file);
      return { id, image: photo };
    });

    //* Update the state with the new photos
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  return (
    <div className="bg-slate-100 h-full font-openSans">
      <div className="container py-10 ">
        <div className="bg-white rounded-lg border">
          {/* Header components */}
          <Header
            handleDeletedPhotos={handleDeletedPhotos}
            selectedPhotos={selectedPhotos}
            setSelectedPhotos={setSelectedPhotos}
          />

          {/* grid layout for gallery */}
          <div
            onDragOver={(e) => e.preventDefault()}
            className=" smooth p-4 md:p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6"
          >
            {(isDragEnd ? photos : reOrderedPhotos)?.map((photo, index) => (
              <div
                draggable="true"
                onTouchStart={(e) => handleDragStart(e, index)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                key={index}
                className={`rounded-lg smooth aspect-square ${
                  index === 0 && "col-span-2 row-span-2"
                }`}
              >
                <label htmlFor={photo?.id} className="relative">
                  <div
                    className={`w-full h-full smooth rounded-lg ${
                      selectedPhotos?.includes(photo?.id)
                        ? "opacity-50"
                        : "hover:bg-zinc-500"
                    }`}
                  >
                    <div
                      className="bg-blend-overlay h-full w-full rounded-lg  bg-cover border-2 border-[#c9cbcf] mix-blend-multiply"
                      style={{
                        backgroundImage: `url('${photo?.image}')`,
                      }}
                    ></div>
                    {/* <img
                      className="h-full w-full  rounded-lg object-cover border-2 border-[#c9cbcf] mix-blend-multiply"
                      src={photo.image}
                      alt={`image-${index}`}
                    /> */}
                  </div>
                  <input
                    type="checkbox"
                    name="gender"
                    id={photo?.id}
                    checked={selectedPhotos?.includes(photo?.id)}
                    className={`${
                      selectedPhotos?.includes(photo?.id)
                        ? "block"
                        : "hover:block hidden active:hidden"
                    } lg:mr-8 w-[14px] h-[14px] lg:w-[18px] lg:h-[18px] cursor-pointer accent-primary absolute top-[14px] left-[14px]  md:top-[18px] md:left-[18px]`}
                    onChange={() => handleSelectedPhotos(photo?.id)}
                  />
                </label>
              </div>
            ))}
            {/* add image button */}
            <AddImages handleAddPhoto={handleAddPhoto} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
