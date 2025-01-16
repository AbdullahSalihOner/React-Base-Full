import ImageItem from "./ImageItem";


function ImageList({ imagesPlaceholder }) {
// imagesPlaceholder --> props olarak kullanılacak 
    return (

        <div className="imageList">

            {imagesPlaceholder.map((image, index) => {

                return <ImageItem image={image} key={index} />;

            })}

        </div>

    );

}



export default ImageList;

           