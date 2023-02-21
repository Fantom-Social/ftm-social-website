import { useParams } from 'react-router';
import ProfileComponent from './profileComponent';

export default function Profile() {
    const params = useParams();
return(
    <ProfileComponent params={params}/>
)
}