import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import "./style.css";
import { Container } from "../../components/Container";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import WhatsAppBtn from "../../components/whatsappbtn/WhatsAppBtn";
import { IoIosContact } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { toast } from "react-toastify";

export const Product = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);

  const adminID = process.env.REACT_APP_ADMIN_ID;
  const user = firebase.user;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await firebase.fetchCategoryById(id);
        console.log("this is my data from id ", categoryData);
        setCategory(categoryData);
        setEditedCategory(categoryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [firebase, id]);

  const handleFieldChange = (subcategoryIndex, field, value) => {
    const updatedCategory = { ...editedCategory };
    updatedCategory.subcategories[subcategoryIndex][field] = value;
    setEditedCategory(updatedCategory);
  };

  const handleDataChange = (subcategoryIndex, dataIndex, field, value) => {
    const updatedCategory = { ...editedCategory };
    updatedCategory.subcategories[subcategoryIndex].data[dataIndex][field] = value;
    setEditedCategory(updatedCategory);
  };

  const handleDescChange = (subcategoryIndex, dataIndex, field, value) => {
    const updatedCategory = { ...editedCategory };
    updatedCategory.subcategories[subcategoryIndex].descriptions[dataIndex][field] = value;
    setEditedCategory(updatedCategory);
  };

  const handleSaveChanges = async () => {
    try {
      await firebase.updateItem(id, editedCategory);
      setCategory(editedCategory);
      setIsEditMode(false);
      toast.success("All Changes Saved");
    } catch (err) {
      setError(err.message);
      toast.error("Something Wrong while Editing Details");
    }
  };

  const handleDeleteField = async (subcategoryIndex) => {
    const updatedCategory = { ...editedCategory };
    updatedCategory.subcategories.splice(subcategoryIndex, 1);
    setEditedCategory(updatedCategory);
    try {
      await firebase.updateItem(id, updatedCategory);
      setCategory(updatedCategory);
      toast.success("Product Deleted Successfully");
    } catch (err) {
      setError(err.message);
      toast.error("Something went wrong while deleting product");
    }
  };

  const handleImageChange = async (subcategoryIndex, e) => {
    const files = Array.from(e.target.files);
    const imageUrls = await Promise.all(files.map((file) => firebase.addImage(file)));

    const updatedCategory = { ...editedCategory };
    updatedCategory.subcategories[subcategoryIndex].images = imageUrls;
    setEditedCategory(updatedCategory);
  };

  const handleAddNewSubcategory = () => {
    const lastSubcategory = editedCategory.subcategories[editedCategory.subcategories.length - 1];
    const newSubcategory = {
      ...lastSubcategory,
      name: "",
      data: lastSubcategory.data.map(dataItem => ({ ...dataItem, value: "" })),
      descriptions: lastSubcategory.descriptions.map(description => ({ ...description, value: "" })),
      images: [],
    };

    const updatedCategory = {
      ...editedCategory,
      subcategories: [...editedCategory.subcategories, newSubcategory],
    };

    setEditedCategory(updatedCategory);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <div className="product">
        <h1 className="sectionHeading">Product Details</h1>
        {user?.uid === adminID && (
          <div className="admin-controls">
            <button onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? "Cancel" : "Edit"}
            </button>
            {isEditMode && <button onClick={handleSaveChanges}>Save</button>}
          </div>
        )}
        {editedCategory?.subcategories?.map((subcategory, subcategoryIndex) => (
          <div key={subcategory.id || subcategoryIndex} className="product-details">
            <div className="product-image">
              <MDBCarousel showIndicators showControls fade >
                <div>
                  {subcategory?.images?.map((image, imageIndex) => (
                    <MDBCarouselItem
                      className={imageIndex === 0 ? "active" : ""}
                      key={imageIndex}
                    >
                      {isEditMode ? (
                        <div>
                          <div>
                          <img
                            src={image}
                            alt={`Thumbnail ${imageIndex}`}
                            className="d-block w-100"
                          />
                          </div>
                          <div className="image-update">
                            <input
                              type="file"
                              multiple
                              onChange={(e) => handleImageChange(subcategoryIndex, e)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                        <img
                          src={image}
                          alt={`Thumbnail ${imageIndex}`}
                          className="d-block w-100"
                        />
                        </div>
                      )}
                    </MDBCarouselItem>
                  ))}
                </div>
              </MDBCarousel>
            </div>
            <div className="details">
              {isEditMode ? (
                <>
                  <input
                    type="text"
                    value={subcategory.name}
                    onChange={(e) =>
                      handleFieldChange(subcategoryIndex, "name", e.target.value)
                    }
                  />
                  {subcategory?.data?.map((data, dataIndex) => (
                    <div key={dataIndex}>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) =>
                          handleDataChange(subcategoryIndex, dataIndex, "name", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        value={data.value}
                        onChange={(e) =>
                          handleDataChange(subcategoryIndex, dataIndex, "value", e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <h3>Product Description</h3>
                  {subcategory?.descriptions?.map((description, dataIndex) => (
                    <div key={dataIndex}>
                      <input
                        type="text"
                        value={description.name}
                        onChange={(e) =>
                          handleDescChange(subcategoryIndex, dataIndex, "name", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        value={description.value}
                        onChange={(e) =>
                          handleDescChange(subcategoryIndex, dataIndex, "value", e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <div className="image-update">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleImageChange(subcategoryIndex, e)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h1>{subcategory.name}</h1>
                  <p className="price">₹ {subcategory?.data[0]?.value}</p>
                  <a href="/get-latest-price">Get Latest Price</a>
                  <table className="table">
                    <tbody>
                      {subcategory?.data?.map((data, dataIndex) => (
                        <tr key={dataIndex}>
                          <td>{data.name}</td>
                          <td>{data.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h2>Product Description</h2>
                  {subcategory?.descriptions?.map((description, dataIndex) => (
                    <div key={dataIndex}>
                      <p>
                        <strong>{description?.name}</strong>
                      </p>
                      <p>{description?.value}</p>
                    </div>
                  ))}
                </>
              )}
              {user?.uid === adminID && isEditMode && (
                <button onClick={() => handleDeleteField(subcategoryIndex)}>
                  Delete Subcategory
                </button>
              )}
              <div className="contact-option">
                <WhatsAppBtn
                  phoneNumber="+919007141362"
                  message={`Hello, I would like to ask more about ${subcategory.name}`}
                />
                <p>
                  <span className="icon">
                    <BsFillTelephoneFill />
                  </span>
                  <strong>Call 90071 41362</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
        {user?.uid === adminID && isEditMode && (
          <button onClick={handleAddNewSubcategory}>Add Another Product</button>
        )}
      </div>
    </Container>
  );
};
