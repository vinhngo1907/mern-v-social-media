import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { showErrMsg, showSuccessMsg } from "../../components/alert/Message";
// import { activeAccount } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { BASE_URL } from "../../utils/constants";
import { postDataApi } from "../../utils/fetchData";

const Active = () => {
    const { id } = useParams();
    console.log({ id })
    // const [err, setErr] = useState('');
    // const [success, setSuccess] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            postDataApi("auth/active", { active_token: id })
                .then(res => {
                    // setSuccess(res.data.msg)

                    localStorage.setItem("firstLogin", true);
                    dispatch({
                        type: GLOBALTYPES.AUTH,
                        payload: {
                            user: res.data.results.user,
                            token: res.data.results.access_token
                        }
                    });
                    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.message } })
                })
                .catch(err =>
                    // setErr(err?.response?.data?.msg || "Something wrong")
                    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
                );
        }
    }, [id, dispatch]);

    return (
        <>
            {/* <div>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

            </div> */}
            <div className="text-center bg-light py-4">
                <h6>Welcome V-Social-Media App</h6>
                <a href={BASE_URL}
                    target="_blank" rel="noreferrer"
                    className="mb-2 d-block">
                    V-Chat App
                </a>
                <p> Copyright &copy; 2022</p>
            </div>
        </>
    )
}

export default Active;