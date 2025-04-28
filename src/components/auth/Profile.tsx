import React, { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Container, Card, Alert, Spinner } from "react-bootstrap";

const Profile = () => {
    const [user, setUser] = useState<{ username: string; role: string } | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const serv = new AuthService();
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await serv.getProfile(token);
                setUser(response.data);
            } catch (err) {
                setError("Failed to fetch profile");
                navigate("/login");
            }
        };

        fetchProfile();
    }, [navigate]);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "400px" }} className="p-4 shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {user ? (
                        <Card.Text className="text-center">
                            Welcome <strong>{user.username}</strong>, your role is <strong>{user.role}</strong>
                        </Card.Text>
                    ) : (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
