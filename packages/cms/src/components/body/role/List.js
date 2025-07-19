import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    dispatchGetAllRoles,
    fetchAllRoles,
    createRole,
    updateRole,
    deleteRole,
} from "../../../redux/actions/roleAction";
import {
    fetchAllCapacities,
    dispatchGetAllCapacities,
} from "../../../redux/actions/capacityAction";

import CapacityModal from "../capacity/CapacityModal";

import pencilIcon from "../../../assets/pencil.svg";
import trashIcon from "../../../assets/trash.svg";
import plusIcon from "../../../assets/plus-circle-fill.svg";
import playIcon from "../../../assets/play-btn.svg";

const RoleList = () => {
    const { auth, token, roles: rolesState, capacities } = useSelector((state) => state);
    const { isAdmin } = auth;

    const roles = rolesState.roles || [];
    const total = rolesState.total || 0;

    const initRole = { name: "", slug: "" };
    const [callback, setCallback] = useState(false);
    const [role, setRole] = useState(initRole);
    const [selectedCapacities, setSelectedCapacities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [page, setPage] = useState(1);
    const limit = 5;

    const dispatch = useDispatch();

    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        if (isAdmin) {
            fetchAllRoles(token, page, limit).then((res) => {
                dispatch(dispatchGetAllRoles(res));
            });
            fetchAllCapacities(token).then((res) => {
                dispatch(dispatchGetAllCapacities(res));
            });
        }
    }, [token, isAdmin, dispatch, callback, page]);

    const toggleCapacity = (id) => {
        if (selectedCapacities.includes(id)) {
            setSelectedCapacities(selectedCapacities.filter((i) => i !== id));
        } else {
            setSelectedCapacities([...selectedCapacities, id]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role._id) {
            dispatch(updateRole(role._id, token, { ...role, capacities: selectedCapacities }));
        } else {
            dispatch(createRole({ ...role, capacities: selectedCapacities }, token));
        }
        setCallback(!callback);
        setRole(initRole);
        setSelectedCapacities([]);
        setShowModal(false);
    };

    const handleEdit = (r) => {
        setRole({ ...r });
        setSelectedCapacities(r.capacities?.map((c) => c._id) || []);
        setModalMode("edit");
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete?")) {
            dispatch(deleteRole(id, token));
            setCallback(!callback);
        }
    };

    return (
        <div className="container py-4">
            <h3 className="mb-4">Role Management</h3>

            <form onSubmit={handleSubmit} className="row g-2 mb-4">
                <div className="col-auto">
                    <label htmlFor="role" className="form-label">
                        Role Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Role name"
                        value={role.name}
                        required
                        onChange={(e) => setRole({ ...role, name: e.target.value })}
                    />
                </div>
                <div className="col-auto d-flex align-items-end">
                    <button
                        type="button"
                        className="btn btn-success mr-2"
                        onClick={() => {
                            if (role._id) {
                                setModalMode("edit");
                            } else {
                                setSelectedCapacities([]);
                                setModalMode("create");
                            }
                            setShowModal(true);
                        }}
                    >
                        <img src={plusIcon} alt="Add capacities" width="16" className="me-1" /> Capacities
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {role._id ? "Update" : "Create"}
                    </button>
                </div>
            </form>

            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Role Name</th>
                            <th>Slug</th>
                            <th>Capacities</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles &&
                            roles.map((r) => (
                                <tr key={r._id}>
                                    <td>{r._id}</td>
                                    <td>{r.name}</td>
                                    <td>{r.slug}</td>
                                    <td>
                                        {r.capacities?.length > 0 ? (
                                            r.capacities.map((cap) => (
                                                <span key={cap._id} className="badge bg-primary me-1">
                                                    {cap.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-muted">No capacities</span>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <button type="button" className="btn btn-sm btn-outline-success mx-2">
                                            <img src={playIcon} alt="Active" width={16} />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary mx-2"
                                            onClick={() => handleEdit(r)}
                                        >
                                            <img src={pencilIcon} alt="Edit" width={16} />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger mx-1"
                                            onClick={() => handleDelete(r._id)}
                                        >
                                            <img src={trashIcon} alt="Delete" width={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <button
                    className="btn btn-outline-secondary"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    className="btn btn-outline-secondary"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>

            <CapacityModal
                show={showModal}
                mode={modalMode}
                roleName={role.name}
                setRoleName={(name) => setRole({ ...role, name })}
                capacities={capacities}
                selected={selectedCapacities}
                toggleCapacity={toggleCapacity}
                onClose={() => {
                    setShowModal(false);
                    setRole(initRole); // clear name khi close
                }}
            />
        </div>
    );
};

export default RoleList;