import { useParams } from 'react-router';
import PostMappingComponent from './postMappingComponent';

export default function Profile() {
    const params = useParams();
return(
    <PostMappingComponent params={params}/>
)
}