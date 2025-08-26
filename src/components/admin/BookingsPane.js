import React, { useState, useMemo } from "react";
import SectionHeader from "./SectionHeader";
import SearchBox from "./SearchBox";
import { useDispatch } from "react-redux";
import {
  Button,
  Table,
  ButtonGroup,
  Alert,
  Badge,
  Dropdown,
  Card,
  Container,
} from "react-bootstrap";
import { updateExpertBookingAPI } from "../../store/expertBooking/thunkCreators";

const BookingsPane = ({ bookings }) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const dispatch = useDispatch();

  const onUpdateStatus = (bookingId, action) => {
    dispatch(updateExpertBookingAPI({ bookingId, action }));
  };

  const filtered = useMemo(() => {
    return bookings
      .filter((booking) =>
        `${booking.expertId.name} ${booking.expertId.fullName} ${booking.status}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .filter((booking) =>
        statusFilter === "All" ? true : booking.status === statusFilter
      );
  }, [bookings, query, statusFilter]);

  return (
    <Container fluid className="px-4 py-3">
      <Card className="shadow-sm border-0 rounded-3">
        <Card.Body>
          <SectionHeader title="Booking Confirmation Tracking">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                variant="outline-secondary"
                id="dropdown-split-basic"
              >
                Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[
                  "All",
                  "Requested",
                  "Confirmed",
                  "Completed",
                  "Cancelled",
                ].map((status) => (
                  <Dropdown.Item
                    key={status}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </SectionHeader>

          {/* Search & Status filter */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search bookings..."
            />
            <Badge bg="info" className="p-2 fs-6">
              Status: {statusFilter}
            </Badge>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <Table hover bordered className="align-middle shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Expert</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id}>
                    <td className="fw-semibold">{booking.id}</td>
                    <td>{booking.startupId.name}</td>
                    <td>{booking.expertId.name}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>
                      <Badge
                        bg={
                          {
                            Requested: "warning",
                            Confirmed: "primary",
                            Completed: "success",
                            Cancelled: "danger",
                          }[booking.status] || "secondary"
                        }
                        className="px-3 py-2"
                      >
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <ButtonGroup size="sm">
                        {booking.status === "Confirmed" && (
                          <Button
                            variant="outline-success"
                            onClick={() =>
                              onUpdateStatus(booking.id, "complete")
                            }
                          >
                            Mark Completed
                          </Button>
                        )}
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <Alert variant="light" className="text-center mt-3">
              <span className="fw-semibold">No bookings found</span> for the
              current filters.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingsPane;
