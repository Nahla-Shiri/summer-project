import React, {useState, useEffect, useRef} from 'react';
import { uploadFile} from '../actions/upload_actions';
import { useDispatch} from "react-redux";

const Thumb = (props) => {

    console.log(typeof(props.file));

    const [loading, setLoading] = useState(false);
    const [thumb, setThumb] = useState(undefined);
    const dispatch = useDispatch();

   
    const isFirstRun = useRef(true);
    
        useEffect (() => {
            if (isFirstRun.current || typeof(props.file) === "string") {
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
    dispatch(uploadFile(thumb));
    return (
        <img src={thumb}
        alt={props.file.name}
        className="img-thumbnail"
        height={200}
        width={200} />
    )
}

export {Thumb}  