import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingUsers } from "../../store/admin/thunkCreators";
import { fetchExperts } from "../../store/experts/thunkCreators";
import UserApproval from "./UserApproval";
import HubsPane from "./HubsPane";
import { fetchHubs } from "../../store/hubs/thunkCreators";
import ExpertDirectory from "./ExpertDirectory";
import {
  Container,
  Row,
  Col,
  Tab,
  Nav,
  Table,
  Button,
  Modal,
  Form,
  Badge,
  Dropdown,
  ButtonGroup,
  InputGroup,
  ProgressBar,
  Alert,
  Toast,
  ToastContainer,
  Card,
} from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

const AdminOverview = () => {
  const dispatch = useDispatch();

  const pendingUsers = useSelector((state) => state.adminUsers.pendingUsers);

  const experts = useSelector((state) => state.experts.experts);

  const hubs = useSelector((state) => state.hubs.hubs);

  useEffect(() => {
    dispatch(fetchPendingUsers());
    dispatch(fetchExperts());
    dispatch(fetchHubs());
  }, []);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  return (
    <Tab.Container fluid className="p-3" defaultActiveKey="analytics">
      <Row>
        <Col md={2} className="mb-3">
          <h5 className="mb-3">Admin Dashboard</h5>
          <Nav
            variant="pills"
            className="flex-column"
            defaultActiveKey="analytics"
          >
            <Nav.Item>
              <Nav.Link eventKey="analytics">📈 Analytics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="users">👤 Approvals</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="experts">⭐ Experts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="hubs">🏢 JHubs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bookings">📅 Bookings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="payments">💸 Payments</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-3">
              {/* <Button variant="outline-dark" size="sm" className="w-100" onClick={exportEverything}>Export All</Button> */}
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10}>
          <Col>
            <Tab.Content>
              {/* <Tab.Pane eventKey="analytics">
                    <AnalyticsPane />
                  </Tab.Pane> */}
              <Tab.Pane eventKey="users">
                <UserApproval
                  pendingUsers={pendingUsers}
                  // onExport={exportUsers}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="experts">
                <ExpertDirectory
                  experts={experts}
                  // onExport={exportExperts}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="hubs">
                <HubsPane
                  hubs={hubs}
                  // onExport={exportHubs}
                />
              </Tab.Pane>
              {/* <Tab.Pane eventKey="bookings">
                    <BookingsPane
                      bookings={bookings}
                      onUpdateStatus={updateBookingStatus}
                      onExport={exportBookings}
                    />
                  </Tab.Pane> */}
              {/* <Tab.Pane eventKey="payments">
                    <PaymentsPane
                      payments={payments}
                      onToggleEligibility={toggleEligibility}
                      onDisburse={disburse}
                      onExport={exportPayments}
                    />
                  </Tab.Pane> */}
            </Tab.Content>
          </Col>
        </Col>
      </Row>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={2500}
          autohide
          bg={toast.variant}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Dashboard</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Tab.Container>
  );
};

export default AdminOverview;
