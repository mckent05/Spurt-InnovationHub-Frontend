import React, { useMemo, useState } from "react";
import SearchBox from "./SearchBox";
import SectionHeader from "./SectionHeader";
import { Button, Table, Alert } from "react-bootstrap";

const HubsPane = ({ hubs }) => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      hubs.filter((hub) =>
        `${hub.name} ${hub.category}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [hubs, query]
  );

  return (
    <>
      <SectionHeader title="JHub Listings Oversight">
        {/* <Button variant="outline-secondary" onClick={() => onExport()}>
          Export CSV
        </Button> */}
      </SectionHeader>
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="Search hub name or category"
      />
      <Table hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manager Name</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((hub) => (
            <tr key={hub.id}>
              <td>{hub.name}</td>
              <td>{hub.managerId.fullName}</td>
              <td>{hub.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {filtered.length === 0 && (
        <Alert variant="light" className="text-center">
          No hubs found.
        </Alert>
      )}
    </>
  );
};

export default HubsPane;
