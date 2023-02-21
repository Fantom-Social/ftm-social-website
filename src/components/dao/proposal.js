import { useParams } from 'react-router';
import ProposalComponent from './proposalComponent';

export default function Proposal() {
    const params = useParams();
return(
    <ProposalComponent params={params}/>
)
}