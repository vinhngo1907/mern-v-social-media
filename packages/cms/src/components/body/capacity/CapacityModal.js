import { useState, useEffect } from 'react';

const CapacityModal = ({
	show,
	mode = "create",
	roleName,
	setRoleName,
	capacities,
	selected,
	toggleCapacity,
	onClose,
	onSave
}) => {
	const [localName, setLocalName] = useState(roleName || "");

	useEffect(() => {
		setLocalName(roleName || "");
	}, [roleName]);

	if (!show) return null;

	const handleSave = () => {
		if (mode === "edit" && !localName.trim()) {
			alert("Role name is required.");
			return;
		}
		setRoleName(localName);
		onSave(localName);
	};

	const handleClose = () => {
    setLocalName("");
    setRoleName(""); 
    onClose();
  };

	return (
		<div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,.5)" }}>
			<div className="modal-dialog">
				<div className="modal-content">

					<div className="modal-header">
						<h5 className="modal-title">{mode === "edit" ? "Edit Role & Capacities" : "Select Capacities"}</h5>
						<button type="button" className="btn-close" onClick={handleClose}></button>
					</div>

					<div className="modal-body">
						{mode === "edit" && (
							<div className="mb-3">
								<label className="form-label">Role Name</label>
								<input
									type="text"
									className="form-control"
									value={localName}
									onChange={e => setLocalName(e.target.value)}
									placeholder="Role name"
								/>
							</div>
						)}

						<div className="mb-3 row">
							{capacities.map(cap => (
								<div className='col-md-4 mb-2' key={cap._id}>
									<div className="form-check" >
										<input
											className="form-check-input"
											type="checkbox"
											id={`cap-${cap._id}`}
											checked={selected.includes(cap._id)}
											onChange={() => toggleCapacity(cap._id)}
										/>
										<label className="form-check-label" htmlFor={`cap-${cap._id}`}>
											{cap.name}
										</label>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="modal-footer">
						<button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
						<button className="btn btn-primary" onClick={handleSave}>Save</button>
					</div>

				</div>
			</div>
		</div>
	);
};

export default CapacityModal;
