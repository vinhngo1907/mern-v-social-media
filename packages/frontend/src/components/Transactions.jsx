import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../redux/transactionSlice';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error, page, totalPages } = useSelector((state) => state.transaction);

    useEffect(() => {
        dispatch(getTransactions(page));
    }, [dispatch, page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(getTransactions(newPage));
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Transactions</h3>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </div>

            {loading && <div className="alert alert-info">Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <>
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Date</th>
                                <th>Content</th>
                                <th>Amount</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No transactions found</td>
                                </tr>
                            ) : (
                                data.map((tx) => (
                                    <tr key={tx.id}>
                                        <td>{new Date(tx.date).toLocaleDateString()}</td>
                                        <td>{tx.content}</td>
                                        <td>{tx.amount}</td>
                                        <td>{tx.type}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </button>

                        <span>
                            Page {page} of {totalPages}
                        </span>

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Transactions;