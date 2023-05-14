import React from "react";
import { Link } from "react-router-dom";

const Social = ()=>{
    return (
        <div className="widget mt-3">
                <h4 className="widget-title">Socials</h4>
                <ul className="socials overlay-scrollbar scrollbar-hover px-3">
                    <li className="facebook">
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
                    </li>
                </ul>
            </div>
    )
}

export default Social