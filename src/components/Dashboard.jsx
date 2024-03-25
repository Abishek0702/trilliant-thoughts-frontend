import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user')

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: 10, display: 'flex', justifyContent: "center", }}>
        Hii  {userData}
      </Typography>
      <div style={{ display: 'flex', justifyContent: "center", flexDirection: "row", gap: 20 }}>
        <Card style={{ maxWidth: 400, backgroundColor: "#ff9999" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" component="div">
              <div><strong>Username:</strong> {userData}</div>
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ maxWidth: 400, backgroundColor: "#9999ff" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" component="div">
              <div><strong>Username:</strong> {userData}</div>
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ maxWidth: 400, backgroundColor: "#a3c2c2" }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" component="div">
              <div><strong>Username:</strong> {userData}</div>
            </Typography>
          </CardContent>
        </Card>
       
      </div>
      <Button variant="contained" color="success" onClick={()=>navigate("/users")} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          User Table
        </Button>
    </>
  );
};

export default Dashboard;
