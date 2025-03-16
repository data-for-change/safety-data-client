import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Recommendation } from "../../types";

type Props = {
  initialData?: Recommendation | null | undefined;
  onSave: (data: Recommendation) => void;
};

const RecommendationForm: React.FC<Props> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<Recommendation>(
    initialData || {
      _id: "",
      title: "",
      category: "",
      description: "",
      tags: [],
      language: "",
      lang: "",
      references: [],
      updateDate: new Date(),
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleReferenceChange = (index: number, field: "title" | "url", value: string) => {
    const updatedReferences = [...formData.references];
    updatedReferences[index] = { ...updatedReferences[index], [field]: value };
    setFormData((prev) => ({ ...prev, references: updatedReferences }));
  };

  const addReference = () => {
    setFormData((prev) => ({
      ...prev,
      references: [...prev.references, { title: "", url: "" }],
    }));
  };

  const removeReference = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Container>
      {/* <h3>{initialData ? "Edit Recommendation" : "Add Recommendation"}</h3> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags (comma-separated)</Form.Label>
          <Form.Control type="text" value={formData.tags.join(", ")} onChange={handleTagChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Language</Form.Label>
          <Form.Control type="text" name="language" value={formData.language} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lang</Form.Label>
          <Form.Control type="text" name="lang" value={formData.lang} onChange={handleChange} required />
        </Form.Group>

        {/* References Section */}
        <Form.Group className="mb-3">
          <Form.Label>References</Form.Label>
          {formData.references.map((ref, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Reference Title"
                  value={ref.title}
                  onChange={(e) => handleReferenceChange(index, "title", e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Reference URL"
                  value={ref.url}
                  onChange={(e) => handleReferenceChange(index, "url", e.target.value)}
                  required
                />
              </Col>
              <Col xs="auto">
                <Button variant="danger" onClick={() => removeReference(index)}>X</Button>
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={addReference}>Add Reference</Button>
        </Form.Group>

        <Button type="submit" variant="primary">Save</Button>
      </Form>
    </Container>
  );
};

export default RecommendationForm;
