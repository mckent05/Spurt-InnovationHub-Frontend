import React, { useState, useMemo } from "react";
import SectionHeader from "./SectionHeader";
import { updateUserAPI } from "../../store/admin/thunkCreators";
import { Button, Table, ButtonGroup, Alert, Badge } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { useDispatch } from "react-redux";

const UserApproval = ({ pendingUsers }) => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const onApprove = (id) => {
    dispatch(updateUserAPI({ id, action: "approve" }));
  };

  const onReject = (id) => {
    dispatch(updateUserAPI({ id, action: "reject" }));
  };
  const filtered = useMemo(
    () =>
      pendingUsers.filter((user) =>
        `${user.fullName} ${user.email} ${user.role}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [pendingUsers, query]
  );

  return (
    <>
      <SectionHeader title="User Registration Approvals">
        <Button variant="outline-secondary">
          Export CSV
        </Button>
      </SectionHeader>
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="Search name, email, role"
      />
      <Table hover responsive className="align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Submitted</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <Badge bg={user.role === "Expert" ? "primary" : "secondary"}>
                  {user.role}
                </Badge>
              </td>
              <td>{user.createdAt}</td>
              <td>{user.status}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button variant="success" onClick={() => onApprove(user.id)}>
                    Approve
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => onReject(user.id)}
                  >
                    Reject
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {filtered.length === 0 && (
        <Alert variant="light" className="text-center">
          No pending registrations match your search.
        </Alert>
      )}
    </>
  );
};

export default UserApproval;
