import Page from '../../components/Page/Page';
import { useAuth } from '../../contexts/AuthContext';
import RoomList from './components/RoomList/RoomList';

interface HomeProps {}

export default function Home({}: HomeProps) {
    const auth = useAuth();
    
    const title = `Welcome ${auth.getLoggedUser()?.fullName}`;

    return (
        <Page>
            <Page.Title>{title}</Page.Title>
            <RoomList />
        </Page>
    );
}
