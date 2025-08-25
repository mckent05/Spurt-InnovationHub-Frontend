import React, { useState, useMemo} from "react";
import {
  createExpertAPI,
  updateExpertAPI,
} from "../../store/experts/thunkCreators";
import { useDispatch } from "react-redux";
import SearchBox from "./SearchBox";
import SectionHeader from "./SectionHeader";
import { Button, Table, ButtonGroup, Modal, Form } from "react-bootstrap";

const ExpertDirectory = ({ experts }) => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [draft, setDraft] = useState({
    id: null,
    name: "",
    biography: "",
    expertise: "",
    calendarLink: "",
  });

  const dispatch = useDispatch();

  const openNew = () => {
    setDraft({
      id: null,
      biography: "",
      expertise: "",
      calendarLink: "",
    });
    setShow(true);
  };
  const openEdit = (expert) => {
    setDraft({ ...expert, expertise: expert.expertise.join(", ") });
    setShow(true);
  };
  const submit = () => {
    const payload = {
      ...draft,
      expertise: draft.expertise
        .split(",")
        .map((expertise) => expertise.trim())
        .filter(Boolean),
    };
    if (draft.id) {
      dispatch(updateExpertAPI(payload));
    } else {
      dispatch(createExpertAPI(payload));
    }
    setShow(false);
  };

  const filtered = useMemo(
    () =>
      experts?.filter((expert) =>
        `${expert} ${expert.biography} ${expert.expertise.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [experts, query]
  );

  return (
    <>
      <SectionHeader title="Expert Directory Management">
        <Button variant="primary" onClick={openNew}>
          Add Expert
        </Button>
        {/* <Button variant="outline-secondary" onClick={() => onExport()}>
          Export CSV
        </Button> */}
      </SectionHeader>
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="Search name, bio, expertise"
      />
      <Table hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Bio</th>
            <th>Expertise</th>
            <th>Calendar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((expert) => (
            <tr key={expert.id}>
              <td>{expert.userId.fullName}</td>
              <td>{expert.biography}</td>
              <td>{expert.expertise.join(", ")}</td>
              {/* <td>
                <div className="d-flex align-items-center gap-2">
                  <span>{e.rating.toFixed(1)}</span>
                  <ProgressBar
                    now={(e.rating / 5) * 100}
                    style={{ width: 120 }}
                  />
                </div>
              </td> */}
              <td>
                <a href={expert.calendarLink} target="_blank" rel="noreferrer">
                  Open
                </a>
              </td>
              <td>
                <ButtonGroup size="sm">
                  <Button variant="outline-primary" onClick={() => openEdit(expert)}>
                    Edit
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{draft.id ? "Edit Expert" : "Add Expert"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="vstack gap-3">
            <Form.Group>
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={draft.biography}
                onChange={(e) => setDraft({ ...draft, biography: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expertise (comma-separated)</Form.Label>
              <Form.Control
                value={draft.expertise}
                onChange={(e) =>
                  setDraft({ ...draft, expertise: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>External Calendar Link</Form.Label>
              <Form.Control
                value={draft.calendarLink}
                onChange={(e) =>
                  setDraft({ ...draft, calendarLink: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submit}>
            {draft.id ? "Save Changes" : "Create Expert"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpertDirectory;
