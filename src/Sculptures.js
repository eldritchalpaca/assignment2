import { useEffect, useState } from "react";


const Gallery = () => {
    const [index, setIndex] = useState(0);

    const [sculpture, setSculpture] = useState([
        {
            named: "",
            artist: "",
            description: "",
            url: "",
            alt: ""
        },
    ]);

    const [showMore, setShowMore] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch("sculptures.json");
            const json = await response.json();
            console.log(json);
            setSculpture(json);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    function handleClickNext() {
        setIndex((index + 1) % sculpture.length);
    }

    function handleClickPrevious() {
        if (index !== 0) setIndex((index - 1));
        else setIndex(sculpture.length - 1)
    }

    function handleShowHideDescription() {
        setShowMore(!showMore);
    }

    return (
        <div>
            <button onClick={handleClickPrevious}>Previous</button>
            <button onClick={handleClickNext}>Next</button>
            <div>
                <button onClick={handleShowHideDescription}>
                    {showMore ? 'Hide' : 'Show'} details
                </button>

            </div>
            <div>
                <h2>
                    <i>{sculpture[index].named} </i>
                    by {sculpture[index].artist}
                </h2>
                <h3>
                    ({index + 1} of {sculpture.length})
                </h3>
                <img src={sculpture[index].url} alt={sculpture[index].alt} />
                <p>{showMore && <p>{sculpture[index].description}</p>}</p>
            </div>
        </div>
    );
};
export default Gallery;