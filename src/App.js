import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const App = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f0f0f0" }}>
      <Card style={{ maxWidth: 400, padding: "16px" }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Welcome to My React App
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            This is a simple React application hosted on Netlify.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => alert("Hello from React!")}>
            Click Me
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
