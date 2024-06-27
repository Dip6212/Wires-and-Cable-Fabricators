import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../context/firebase';
import { Card, Col, Container, Row, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./style.css";

const Category = () => {
  const firebase = useFirebase();
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editSubcategories, setEditSubcategories] = useState([]);
  const navigate = useNavigate();

  const adminID = process.env.REACT_APP_ADMIN_ID;
  const user = firebase.user; // Assuming you have a user object in firebase context

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await firebase.listAllCategories();
      const categoryList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoryList);
    };

    fetchCategories();
  }, [firebase]);

  const handleDelete = async (categoryId) => {
    await firebase.deleteCategoryById(categoryId);
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setEditName(category.name);
    setEditSubcategories(category.subcategories);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    await firebase.updateCategoryById(currentCategory.id, {
      name: editName,
      subcategories: editSubcategories,
    });
    setCategories(categories.map(category => 
      category.id === currentCategory.id ? { ...category, name: editName, subcategories: editSubcategories } : category
    ));
    setShowModal(false);
  };

  return (
    <div>
      <Container>
        <h1 className='sectionHeading'>Product & Services</h1>
        <Row xs={1} md={2} lg={3}>
          {categories.length === 0 ? (
            <p>No categories found</p>
          ) : (
            categories.map((category) => (
              <Col key={category.id} className="mb-4 d-flex">
                <Card className="category-card">
                  <Card.Img 
                    variant="top" 
                    src={category?.subcategories[0]?.images[0] || 'https://via.placeholder.com/300'} 
                    onClick={() => navigate(`/product/${category.id}`)}
                  />
                  <Card.Body className="d-flex flex-column text-center">
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      {category.subcategories && category.subcategories.length > 0 ? (
                        <ul>
                          {category.subcategories.map((sub, index) => (
                            <li key={index}>
                              <p>{sub.name}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <>no products for this category</>
                      )}
                    </Card.Text>
                    <Card.Footer className="text-muted">
                      View More {'>'}
                    </Card.Footer>
                    {user?.uid === adminID && (
                      <div>
                        <Button style={{ marginBottom: '10px' }} variant="warning" onClick={() => handleEdit(category)}>Edit</Button>
                        <Button style={{ marginBottom: '10px' }} variant="danger" onClick={() => handleDelete(category.id)}>Delete</Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control 
                type="text" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subcategories</Form.Label>
              {editSubcategories.map((sub, index) => (
                <div key={index}>
                  <Form.Control 
                    type="text" 
                    value={sub.name} 
                    onChange={(e) => {
                      const newSubcategories = [...editSubcategories];
                      newSubcategories[index].name = e.target.value;
                      setEditSubcategories(newSubcategories);
                    }} 
                  />
                </div>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
