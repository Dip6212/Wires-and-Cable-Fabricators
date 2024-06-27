import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const firebase = useFirebase();

  const [category, setCategory] = useState({
    name: "",
    subcategories: [
      {
        name: "",
        data: [{ name: "", value: "" }],
        descriptions: [{ name: "", value: "" }],
        images: [],
      },
    ],
  });

  const handleCategoryChange = (value) => {
    setCategory({ ...category, name: value });
  };

  const handleAddSubcategory = () => {
    setCategory({
      ...category,
      subcategories: [
        ...category.subcategories,
        { name: "", data: [{ name: "", value: "" }], descriptions: [{ name: "", value: "" }], images: [] },
      ],
    });
  };

  const handleRemoveSubcategory = (subIndex) => {
    const newSubcategories = category.subcategories.filter((_, i) => i !== subIndex);
    setCategory({ ...category, subcategories: newSubcategories });
  };

  const handleSubcategoryChange = (subIndex, field, value) => {
    const newSubcategories = category.subcategories.map((sub, i) =>
      i === subIndex ? { ...sub, [field]: value } : sub
    );
    setCategory({ ...category, subcategories: newSubcategories });
  };

  const handleAddDataField = (subIndex) => {
    const newSubcategories = category.subcategories.map((sub, i) =>
      i === subIndex ? { ...sub, data: [...sub.data, { name: "", value: "" }] } : sub
    );
    setCategory({ ...category, subcategories: newSubcategories });
  };

  const handleRemoveDataField = (subIndex, dataIndex) => {
    const newSubcategories = category.subcategories.map((sub, i) =>
      i === subIndex ? { ...sub, data: sub.data.filter((_, dIndex) => dIndex !== dataIndex) } : sub
    );
    setCategory({ ...category, subcategories: newSubcategories });
  };

  const handleDataFieldChange = (subIndex, dataIndex, field, value) => {
    const newSubcategories = category.subcategories.map((sub, i) =>
      i === subIndex
        ? {
            ...sub,
            data: sub.data.map((d, dIndex) =>
              dIndex === dataIndex ? { ...d, [field]: value } : d
            ),
          }
        : sub
    );
    setCategory({ ...category, subcategories: newSubcategories });
  };

  const handleAddDescriptionField = (subIndex) => {
    const newSubcategories = category.subcategories.map((sub, i) =>
      i === subIndex ? { ...sub, descriptions: [...sub.descriptions, { name: "", value: "" }] } : sub
    );
    setCategory({ ...category, subcategories: newSubcategories });
  };

  const handleRemoveDescriptionField = (subIndex, descIndex) => {
    const newSubcategories = category.subcategories.map((sub, i) =>
      i === subIndex ? { ...sub, descriptions: sub.descriptions.filter((_, dIndex) => dIndex !== descIndex) } : sub
    );
    setCategory({ ...category, subcategories: newSubcategories });
  };

  const handleDescriptionFieldChange = (subIndex, descIndex, field, value) => {
    const newSubcategories = category.subcategories.map((sub, i) =>
      i === subIndex
        ? {
            ...sub,
            descriptions: sub.descriptions.map((desc, dIndex) =>
              dIndex === descIndex ? { ...desc, [field]: value } : desc
            ),
          }
        : sub
    );
    setCategory({ ...category, subcategories: newSubcategories });
  };

  const handleImageChange = async (subIndex, e) => {
    if (!e.target || !e.target.files || e.target.files.length === 0) {
      console.error("No file selected");
      return;
    }

    const files = Array.from(e.target.files);
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const storageRef = firebase.storageRef(firebase.storage, `images/${file.name}`);
        await firebase.uploadBytes(storageRef, file);
        return await firebase.getDownloadURL(storageRef);
      })
    );

    const newSubcategories = category.subcategories.map((sub, i) =>
      i === subIndex ? { ...sub, images: [...sub.images, ...uploadedImages] } : sub
    );
    setCategory({ ...category, subcategories: newSubcategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const subcategories = await Promise.all(
        category.subcategories.map(async (subcategory) => {
          const images = await Promise.all(
            subcategory.images.map(async (image) => {
              if (image.startsWith("blob:")) {
                const file = await fetch(image).then((r) => r.blob());
                const storageRef = firebase.storageRef(firebase.storage, `images/${file.name}`);
                await firebase.uploadBytes(storageRef, file);
                return await firebase.getDownloadURL(storageRef);
              }
              return image;
            })
          );
          return { ...subcategory, images };
        })
      );

      const categoryData = {
        name: category.name,
        subcategories: subcategories.map((subcategory) => ({
          name: subcategory.name,
          data: subcategory.data,
          descriptions: subcategory.descriptions,
          images: subcategory.images,
        })),
      };

      await firebase.handleCreateNewListing(categoryData);
      console.log("Category successfully created!", categoryData);
      toast.success("Category successfully created!");
    } catch (error) {
      console.error("Error creating new listing: ", error);
      toast.error("Error creating new listing ")
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Form.Group controlId={`category-name`}>
            <Form.Label><strong>Product Category Name</strong></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={category.name}
              onChange={(e) => handleCategoryChange(e.target.value)}
            />
          </Form.Group>
          {category.subcategories.map((subcategory, subIndex) => (
            <div key={subIndex} className="ml-3 mb-4">
              <Form.Group controlId={`subcategory-name-${subIndex}`}>
                <Form.Label><strong>Product Name</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product name"
                  value={subcategory.name}
                  onChange={(e) => handleSubcategoryChange(subIndex, "name", e.target.value)}
                />
              </Form.Group>
              {subcategory.descriptions.map((desc, descIndex) => (
                <div key={descIndex} className="ml-4 mb-3">
                  <Form.Group controlId={`description-name-${subIndex}-${descIndex}`}>
                    <Form.Label><strong>Product Description Heading</strong></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter description name"
                      value={desc.name}
                      onChange={(e) => handleDescriptionFieldChange(subIndex, descIndex, "name", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`description-value-${subIndex}-${descIndex}`}>
                    <Form.Label><strong>Product Description</strong></Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter description value"
                      value={desc.value}
                      onChange={(e) => handleDescriptionFieldChange(subIndex, descIndex, "value", e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveDescriptionField(subIndex, descIndex)}
                  >
                    Remove Description
                  </Button>
                </div>
              ))}
              <Button
                variant="primary"
                onClick={() => handleAddDescriptionField(subIndex)}
              >
                Add Another Description
              </Button>
              {subcategory.data.map((field, dataIndex) => (
                <div key={dataIndex} className="ml-4 mb-3">
                  <Form.Group controlId={`data-name-${subIndex}-${dataIndex}`}>
                    <Form.Label><strong>Field Name (Enter the price first)</strong></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter field name"
                      value={field.name}
                      onChange={(e) => handleDataFieldChange(subIndex, dataIndex, "name", e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`data-value-${subIndex}-${dataIndex}`}>
                    <Form.Label><strong>Field Value</strong></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter field value"
                      value={field.value}
                      onChange={(e) => handleDataFieldChange(subIndex, dataIndex, "value", e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveDataField(subIndex, dataIndex)}
                  >
                    Remove Field
                  </Button>
                  <div style={{marginTop:"20px"}}>
                  <Button
                variant="primary"
                onClick={() => handleAddDataField(subIndex)}
              >
                Add Field
              </Button>
              </div>
                </div>
              ))}
              <Form.Group controlId={`subcategory-image-${subIndex}`}>
                <Form.Label><strong>Product Images</strong></Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => handleImageChange(subIndex, e)}
                />
              </Form.Group>
              <div>
                {subcategory.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Subcategory ${subIndex} Image ${imgIndex}`}
                    style={{ width: "100px", height: "100px", marginRight: "10px" }}
                  />
                ))}
              </div>
              {/* <Button
                variant="primary"
                onClick={() => handleAddDataField(subIndex)}
              >
                Add Field
              </Button> */}
            </div>
          ))}
          <Button variant="primary" onClick={handleAddSubcategory}>
            Add Another 
            Product
          </Button>
        </div>
        <Button variant="primary" type="submit" className="ml-3">
          Create
        </Button>
      </Form>
    </div>
  );
};
