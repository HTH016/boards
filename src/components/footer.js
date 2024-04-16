import React from 'react';

//Routing
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

// Boot Strap

import Card from 'react-bootstrap/Card';



function WithHeaderExample() {
  return (
    <Card>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          ddddddddddddddddddddddddddddddddddd
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WithHeaderExample;