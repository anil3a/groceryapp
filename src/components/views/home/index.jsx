import { useState } from 'react';
import { auth, firestore } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Home = () => {

    const[userData, SetUserData] = useState({})

    const user = auth.currentUser;

    const isEmptyObject = (val) => {
        if( !val || val === {} || val === undefined || val === null || Object.keys(val).length === 0 ){
            return true;
        }
        return false;
    }

    const getUserData = async () => {
        if(!user){
            return;
        }

        const userRef = collection(firestore, 'Users');
        const q = query(userRef, where("uid", "==", user.uid));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            SetUserData(doc.data());
        });
    }

    let email_name = '';
    if( user && user.email ){
        email_name = user.email.split('@')[0];
    }

    if( isEmptyObject(userData) ){
        getUserData();
    }

    return (
        <div>
            {email_name ? <h2>Welcome {email_name}</h2> : <h2>Welcome Anonymous</h2>}
            <div className='card mt-4'>
                <div className='card-header'>
                    <h3>User Information</h3>
                    <span className='mute text-success'>(Real Data from firebase database)</span>
                </div>
                <div className='card-body'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" readOnly className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstname">First name</label>
                            <input type="text" readOnly className="form-control" id="firstname" value={userData.firstname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last name</label>
                            <input type="text" readOnly className="form-control" id="lastname" value={userData.lastname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" readOnly className="form-control" id="address" value={userData.address} />
                        </div>
                        <div className="form-group d-flex">
                            <label htmlFor="active" className='me-3' role="button">Active</label>
                            <input type="checkbox" readOnly className="" id="active" checked={userData.active} role="button" />
                        </div>
                        <div className="form-group float-end">
                            <button className='btn btn-success'>Save</button>
                        </div>
                    </form>
                </div>
            </div>


            <div className="card mt-4">
                <div className="card-header">
                    <h3>User Homes</h3>
                    <span className='mute text-danger'>(Fake Data - need to get from firebase)</span>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div className="table-wrapper">
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-info btn-sm"><i className="fa fa-plus"></i> Add New</button>
                            </div>
                            <table className="table table-bordered mt-2">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Home Kitchen Hurstville</td>
                                        <td>Hurstville, NSW Australia</td>
                                        <td>
                                            <a className="add m-1" title="" data-toggle="tooltip" data-original-title="Add"><i className="fa fa-cross"></i></a>
                                            <a className="edit m-1" title="" data-toggle="tooltip" data-original-title="Edit"><i className="fa fa-pencil"></i></a>
                                            <a className="delete m-1" title="" data-toggle="tooltip" data-original-title="Delete"><i className="fa fa-trash"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Office Kitchen Sydney</td>
                                        <td>Sydney, NSW Australia</td>
                                        <td>
                                            <a className="add m-1" title="" data-toggle="tooltip" data-original-title="Add"><i className="fa fa-cross"></i></a>
                                            <a className="edit m-1" title="" data-toggle="tooltip" data-original-title="Edit"><i className="fa fa-pencil"></i></a>
                                            <a className="delete m-1" title="" data-toggle="tooltip" data-original-title="Delete"><i className="fa fa-trash"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Original Home Kitchen Nepal</td>
                                        <td>Kathmandu, Nepal</td>
                                        <td>
                                            <a className="add m-1" title="" data-toggle="tooltip" data-original-title="Add"><i className="fa fa-cross"></i></a>
                                            <a className="edit m-1" title="" data-toggle="tooltip" data-original-title="Edit"><i className="fa fa-pencil"></i></a>
                                            <a className="delete m-1" title="" data-toggle="tooltip" data-original-title="Delete"><i className="fa fa-trash"></i></a>
                                        </td>
                                    </tr>      
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;