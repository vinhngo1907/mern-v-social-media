import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Social = () => {
    const { social } = useSelector(state => state);
    
    const [data, setData] = useState([]);
    useEffect(() => {
        if (social.data && social.data.length > 0) {
            setData(social.data)
        }
    }, [social.data]);
    
    return (
        <div className="widget mt-3">
            <h4 className="widget-title">Socials</h4>
            <ul className="socials overlay-scrollbar scrollbar-hover px-3">
                {
                    social.loading && <div className="spinner-border d-block mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }
                {
                    data && data.length > 0 && data.map((s, index) => (
                        <li className={`${s.title}`} key={index}>
                            <Link title={s.title} to="/">
                                <i className={`fa fa-${s.title}`} /> <span>{s.title}</span>
                                <ins>
                                    {
                                        s.title === "github"
                                            ? `${s.followerCount} followers`
                                            : `${s.subscriberCount} subscribers`
                                    }
                                </ins>
                            </Link>
                        </li>
                    ))
                }
                {/* <li className="facebook">
                        <Link title="facebook" to="/">
                            <i className="fa fa-facebook" /> <span>facebook</span> <ins>45 likes</ins>
                        </Link>
                    </li>
                    <li className="github">
                        <Link title="github" to="/">
                            <i className="fa fa-github" /> <span>github</span><ins>25 likes</ins>
                        </Link>
                    </li>
                    <li className="youtube">
                        <Link title="youtube" to="#">
                            <i className="fa fa-youtube" /> <span>youtube</span><ins>35 likes</ins>
                        </Link>
                    </li> */}
            </ul>
        </div>
    )
}

export default Social