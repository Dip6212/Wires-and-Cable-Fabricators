import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaIndustry, FaUsers, FaBuilding, FaBalanceScale, FaChartLine, FaGlobe, FaFileAlt } from 'react-icons/fa';
import { useFirebase } from '../context/firebase'; // Adjust the import path as needed
import { Link } from "react-router-dom"; // Make sure to install and import react-router-dom

const About = () => {
  const { getAboutDetails, updateAboutParagraph, user } = useFirebase(); // Assuming updateAboutParagraph is available
  const [details, setDetails] = useState([]);
  const [paragraph, setParagraph] = useState("Established In The Year 1988, \"Wire And Cable Fabricators\" Is Manufacturer Of Water Cooled Power Cable, Stainless Steel Wire Hose Clamp, Water Flow Switch & Bare Tinned Copper Round Braids Etc.");
  const [isEditingParagraph, setIsEditingParagraph] = useState(false);
  const adminID = process.env.REACT_APP_ADMIN_ID;

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getAboutDetails();
      setDetails(data);
    };

    fetchDetails();
  }, [getAboutDetails]);

  const handleParagraphChange = (e) => {
    setParagraph(e.target.value);
  };

  const handleSaveParagraph = async () => {
    // Save the updated paragraph to the database
    // await updateAboutParagraph(paragraph);
    setIsEditingParagraph(false);
  };

  // Hard-coded icons
  const icons = {
    "Nature of Business": <FaIndustry size={40} />,
    "Total Number of Employees": <FaUsers size={40} />,
    "Year of Establishment": <FaBuilding size={40} />,
    "Legal Status of Firm": <FaBalanceScale size={40} />,
    "Annual Turnover": <FaChartLine size={40} />,
    "Import Export Code (IEC)": <FaGlobe size={40} />,
    "GST Number": <FaFileAlt size={40} />,
    "MSME": <FaFileAlt size={40} />,
  };

  return (
    <>
      <h1 className="sectionHeading">About Us</h1>
      <Container>
        <div style={{ textAlign: "center" }}>
          <h3>Wires And Cable Fabricators</h3>
          {isEditingParagraph ? (
            <Form.Group controlId="paragraphEdit">
              <Form.Control as="textarea" rows={3} value={paragraph} onChange={handleParagraphChange} />
              <Button variant="primary" onClick={handleSaveParagraph} className="mt-2">Save</Button>
              <Button variant="secondary" onClick={() => setIsEditingParagraph(false)} className="mt-2 ml-2">Cancel</Button>
            </Form.Group>
          ) : (
            <p>
              {paragraph}
              {user?.uid === adminID && (
                <Button variant="link" onClick={() => setIsEditingParagraph(true)} className="ml-2">
                  Edit
                </Button>
              )}
            </p>
          )}
        </div>
      </Container>
      <Container className="mt-5">
        <Row>
          {details.map((detail, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4 d-flex align-items-center  flex-direction-column">
              <div className="mr-3">
                {icons[detail.title]}
              </div>
              <div>
                <h5>{detail.title}</h5>
                <p>{detail.description}</p>
                {user?.uid === adminID && (
                  <Button as={Link} to={`/edit-about-detail/${detail.id}`} variant="secondary" size="sm">
                    Edit
                  </Button>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default About;
