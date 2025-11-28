import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "../components/global/NotFound";

const generatePage = (pageName) => {
    const component = () => require(`../pages/${pageName}`).default;

    try {
        return React.createElement(component())
    } catch (err) {
        return <NotFound />
    }
}

const PageRender = () => {
    const { auth } = useSelector(state => state);
    const { id, page } = useParams();

    let pageName = '';

    if (auth.token) {
        if (id) {
            pageName = `${page}/[id]`;
        } else {
            pageName = `${page}`;
        }
    }
    return generatePage(pageName)
}

export default PageRender;