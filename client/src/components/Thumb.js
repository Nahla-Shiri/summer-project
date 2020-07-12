import React, {useState, useEffect, useRef} from 'react'

const Thumb = (props) => {

    const [loading, setLoading] = useState(false);
    const [thumb, setThumb] = useState(undefined);


    //Skipping first iteration (exactly like componentWillReceiveProps):
    const isFirstRun = useRef(true);
        useEffect (() => {
            if (isFirstRun.current) {
                isFirstRun.current = false;
                return;
            }
            setLoading(true);
            let reader = new FileReader();
            reader.onloadend = () => {
                setLoading(false);
                setThumb(reader.result);
                
            };

            reader.readAsDataURL(props.file);
        }, [props.file]);

   
  
      if (!props.file) { return null; }

    if (loading) { return <p>loading...</p>; }

    return (
        <img src={thumb}
        alt={props.file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200} />
    )
}

export {Thumb}  