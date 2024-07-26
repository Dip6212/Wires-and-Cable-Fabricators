import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase"; 
import { Container, Form, Button } from "react-bootstrap";

const EditAboutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchAboutDetailById, updateAboutDetail } = useFirebase();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const fetchedDetail = await fetchAboutDetailById(id);
      setDetail(fetchedDetail);
      setLoading(false);
    };

    fetchDetail();
  }, [id, fetchAboutDetailById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedDetail = {
      description: form.description.value,
    };

    await updateAboutDetail(id, updatedDetail);
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Edit About Detail</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={detail.description}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default EditAboutDetail;
