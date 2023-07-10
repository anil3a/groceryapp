import { auth } from '../../firebase';

const Home = () => {

    const user = auth.currentUser;

    let email_name = '';
    if( user && user.email ){
        email_name = user.email.split('@')[0];
    }

    return (
        <div>
            <h1>Home</h1>
            {email_name ? <h2>Welcome {email_name}</h2> : <h2>Welcome Anonymous</h2>}
        </div>
    )
}

export default Home;