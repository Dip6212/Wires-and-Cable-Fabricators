import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FaIndustry, FaUsers, FaBuilding, FaBalanceScale, FaChartLine, FaGlobe, FaFileAlt } from 'react-icons/fa';

const About = () => {

  const details = [
    {
      icon: <FaIndustry size={40} />,
      title: 'Nature of Business',
      description: 'Exporter and Manufacturer',
    },
    {
      icon: <FaUsers size={40} />,
      title: 'Total Number of Employees',
      description: 'Upto 10 People',
    },
    {
      icon: <FaBuilding size={40} />,
      title: 'Year of Establishment',
      description: '1988',
    },
    {
      icon: <FaBalanceScale size={40} />,
      title: 'Legal Status of Firm',
      description: 'Individual - Proprietor',
    },
    {
      icon: <FaChartLine size={40} />,
      title: 'Annual Turnover',
      description: 'Rs. 50 Lakh - 1 Crore',
    },
    {
      icon: <FaGlobe size={40} />,
      title: 'Import Export Code (IEC)',
      description: 'AZTPM*****',
    },
    {
      icon: <FaFileAlt size={40} />,
      title: 'GST Number',
      description: '19AZTPM6545Q1Z3',
    },
  ];

  return (
    <>
      <h1 className="sectionHeading">About Us</h1>
      <Container>
      <div style={{textAlign:"center"}}>
        <h3>Wires And Cable Fabricators</h3>
        <p>
          Established In The Year 1988, "Wire And Cable Fabricators" Is
          Manufacturer Of Water Cooled Power Cable, Stainless Steel Wire Hose
          Clamp, Water Flow Switch & Bare Tinned Copper Round Braids Etc.
        </p>
      </div>
      </Container>
      <Container className="mt-5">
      <Row>
        {details.map((detail, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4 d-flex align-items-center  flex-direction-column">
            <div className="mr-3">
              {detail.icon}
            </div>
            <div>
              <h5>{detail.title}</h5>
              <p>{detail.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default About;
