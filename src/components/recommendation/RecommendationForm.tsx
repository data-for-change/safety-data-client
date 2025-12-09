import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Recommendation } from "../../types";

type Props = {
  initialData?: Recommendation | null | undefined;
  onSave: (data: Recommendation) => void;
  onDelete: (id: string) => void;
  language?: string;
};

const RecommendationForm: React.FC<Props> = ({ initialData, onSave, onDelete, language }) => {
  const [formData, setFormData] = useState<Recommendation>(
    initialData || {
      _id: "",
      title: "",
      category: "",
      description: "",
      tags: [],
      language: language ? (language === "he" ? "עברית" : "english") : "",
      lang: language ? language : "",
      references: [],
      updateDate: new Date(),
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (index: number, field: "name" | "score", value: string) => {
    const updatedTagss = [...formData.tags];
    updatedTagss[index] = { ...updatedTagss[index], [field]: value };
    setFormData((prev) => ({ ...prev, tags: updatedTagss }));
  };
  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };
  const addTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, { name: "", score: 100 }],
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

  const handleDelete = () => {
    if (formData._id && window.confirm("Are you sure you want to delete this recommendation?")) {
      onDelete(formData._id);
    }
  };

  return (
    <Container>
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
          <Form.Control as="textarea" name="description" value={formData.description} rows={4}
          onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Language</Form.Label>
          <Form.Control type="text" name="language" value={formData.language} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lang</Form.Label>
          <Form.Control type="text" name="lang" value={formData.lang} onChange={handleChange} required />
        </Form.Group>

       <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
           {formData.tags.map((ref, index) =>(
            <Row key={index}  className="mb-2">
              <Col><Form.Control
                  type="text"
                  placeholder="Tag"
                  value={ref.name}
                  onChange={(e) => handleTagChange(index, "name", e.target.value)}
                  required
                /></Col>
                <Col>
                  <Form.Group controlId={`score-${index}`}>
                    <Form.Control
                      type="number"
                      placeholder="Score"
                      value={ref.score}
                      min={1}
                      max={100}
                      onChange={(e) => handleTagChange(index, "score", e.target.value)}
                      isInvalid={ref.score < 1 || ref.score > 100}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Score must be between 1 and 100.
                    </Form.Control.Feedback>
                  </Form.Group>
              </Col>
               <Col xs="auto">
                <Button variant="danger" onClick={() => removeTag(index)}>X</Button>
              </Col>
            </Row>
           )) }
           <Button variant="secondary" onClick={addTag}>Add Tag</Button>
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

        <Button type="submit" variant="primary" className="me-2">Save</Button>

        {initialData && (
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        )}
      </Form>
    </Container>
  );
};

export default RecommendationForm;
