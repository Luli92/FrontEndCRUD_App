import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import UserList from "../UserList";
import Label from "../common/Label";
import { ResponseLabel } from "../ResponseLabel";
import Pagination from "../Pagination/Pagination";
import { getUsers, deleteUser, handleAPIresponse } from "../../API";
import { SimpleModal, DeleteModal } from "../common/Modal";
import Button from "../common/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs(props) {
  const { users, checked, editMode, disable } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const labeltextArray = ["Name", "Email", "Date Created", "Date Modified"];
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await getUsers();
      setPosts(res.data.items);
      setLoading(false);
      const apiResponse = handleAPIresponse(res);
      setResponseMessage(apiResponse);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeleteRequest = () => {
    setDeleteConfirm(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          style={{ backgroundColor: "black" }}
        >
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Products" {...a11yProps(1)} />
          <Tab label="Manufacturers" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Label labeltexts={labeltextArray}></Label>
        <UserList
          users={currentPosts}
          checked={checked}
          editMode={editMode}
          loading={loading}
        ></UserList>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ResponseLabel message={responseMessage} />
        </div>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        ></Pagination>
        <>
          {users && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  title={"Delete Selected"}
                  fill={"secondary"}
                  onClick={handleDeleteRequest}
                  disabled={!disable}
                />
                <SimpleModal editMode={false} />
              </div>
              <>
                {deleteConfirm && (
                  <DeleteModal
                    deleteUser={deleteUser}
                    editUser={editMode}
                  ></DeleteModal>
                )}
              </>
            </>
          )}
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Products
      </TabPanel>
      <TabPanel value={value} index={2}>
        Manufacturers
      </TabPanel>
    </div>
  );
}
