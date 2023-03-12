import {useLocation} from 'react-router-dom';
import CreatePostPopup from './createPostPopup';

export default function CreatePost() {
    const location = useLocation();
    return(
        <CreatePostPopup link={location.state.link}/>
    )
}