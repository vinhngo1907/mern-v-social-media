import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchGetAllRoles, fetchAllRoles } from "../../../redux/actions/roleAction";
const List = () => {
    const { auth, token, roles } = useSelector(state => state);
    const { user, isAdmin } = auth;
    const [callback, setCallback] = useState(false);
    const [role, setRole] = useState({
        name: "",
        slug: ""
    });

    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const dispatch = useDispatch();
    useEffect(() => {
        if (isAdmin) {
            fetchAllRoles(token).then(res => {
                dispatch(dispatchGetAllRoles(res));
            });
        }
    }, [token, isAdmin, dispatch, callback]);

    const editRole = async (id) => {

    }
    const deleteRole = async () => {

    }
    return (
        <div className="roles">

            <form >
                <label htmlFor="role">Role</label>
                <input type="text" name="role" value={role} required
                    onChange={e => setRole(e.target.value)} />

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
             <div className="col">
                {
                    roles && roles.map(role => (
                        <div className="row" key={role._id}>
                            <p>{role.name}</p>
                            <div>
                                <button onClick={() => editRole(role._id, role.name)}>Edit</button>
                                <button onClick={() => deleteRole(role._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default List;