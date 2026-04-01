import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

export default function TrackOrder() {
  const [awb, setAwb] = useState("");
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:5000";

const handleTrack = async () => {
  if (!awb) return alert("Enter AWB number");

  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/api/track/${awb}`);

    const data = await res.json();
    console.log("TRACK DATA:", data); // 🔍 debug

    if (!res.ok || !data.success) {
      alert(data.message || "Tracking failed");
      return;
    }

    setTracking(data.data); // ✅ important fix

  } catch (err) {
    console.error(err);
    alert("Failed to fetch tracking");
  } finally {
    setLoading(false);
  }
};

  return (
    <Container className="py-5">
      <Card className="p-4 shadow rounded-4">
        <h3 className="fw-bold mb-3">Track Your Order</h3>

        <Form.Control
          type="text"
          placeholder="Enter AWB / Tracking ID"
          value={awb}
          onChange={(e) => setAwb(e.target.value)}
          className="mb-3"
        />

        <Button onClick={handleTrack} disabled={loading}>
          {loading ? "Tracking..." : "Track Order"}
        </Button>

        {tracking && (
          <div className="mt-4">
           <h5>
  Status: {tracking?.tracking_data?.shipment_status || "N/A"}
</h5>

            <ul>
              {tracking?.tracking_data?.shipment_track_activities?.map((item, i) => (
                <li key={i}>
                  {item.date} - {item.status} ({item.location})
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </Container>
  );
}