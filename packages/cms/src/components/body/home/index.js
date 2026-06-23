import React, { useState } from "react";
import "./home.css";
import Table from "./Table";

const MENU = [
  { key: "users", label: "Users" },
  { key: "groups", label: "Groups" },
  { key: "posts", label: "Posts" },
  { key: "comments", label: "Comments" },
  { key: "policies", label: "Policies" },
  { key: "content", label: "Videos" },
];

function Home() {
  const [activeTab, setActiveTab] = useState("users");

  const renderTable = () => {
    switch (activeTab) {
      case "users":
        return <Table title="Users" columns={["ID", "Email", "Role"]} />;
      case "posts":
        return <Table title="Posts" columns={["ID", "Title", "Status"]} />;
      case "comments":
        return <Table title="Comments" columns={["ID", "Content"]} />;
      default:
        return <Table title="Data" columns={["ID", "Name"]} />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* LEFT SIDEBAR */}
        <div className="col-3 sidebar">
          <h5 className="mt-3">Admin CMS</h5>
          <ul className="list-group mt-4">
            {MENU.map((item) => (
              <li
                key={item.key}
                className={`list-group-item ${activeTab === item.key ? "active" : ""
                  }`}
                onClick={() => setActiveTab(item.key)}
                style={{ cursor: "pointer" }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-9 content p-4">
          <h4 className="mb-4 text-capitalize">{activeTab}</h4>
          {renderTable()}
        </div>

      </div>
    </div>
  );
}

export default Home;