import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function FeedbackAnalysis() {
  const [loading, setLoading] = useState(true);
  const [poMatrix, setPoMatrix] = useState([]); // Array to store PO Matrix [{ name: 'PO1', mapping: 'Mapping1' }, ...]
  const [psoMatrix, setPsoMatrix] = useState([]); // Array to store PSO Matrix [{ name: 'PSO1', mapping: 'Mapping1' }, ...]
  const [selectedPo, setSelectedPo] = useState(''); // Selected PO value
  const [selectedPso, setSelectedPso] = useState(''); // Selected PSO value
  const [questionAnalysis, setQuestionAnalysis] = useState({});
  const {eventId,eventName,eventDate}=useParams();

  const selectedPoMapping = "1";
  const selectedPsoMapping = "1";
  



    // Function to fetch and set question analysis
    useEffect(() => {
      axios
        .get(`https://ems-api-63wi.onrender.com/admin/feedback/${eventId}`)
        .then((res) => {
          setQuestionAnalysis(res.data.questionAnalysis);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();;
  }

  // Function to handle adding PO to the matrix
  const addPoToMatrix = () => {
    if (selectedPo && !poMatrix.some(po => po.name === selectedPo)) {
      setPoMatrix([...poMatrix, { name: selectedPo, mapping: selectedPoMapping }]);
      setSelectedPo('');
    }
  };

  // Function to handle adding PSO to the matrix
  const addPsoToMatrix = () => {
    if (selectedPso && !psoMatrix.some(pso => pso.name === selectedPso)) {
      setPsoMatrix([...psoMatrix, { name: selectedPso, mapping: selectedPsoMapping }]);
      setSelectedPso('');
    }
  };

  // Function to remove a PO from the matrix
  const removePoFromMatrix = (po) => {
    const updatedPoMatrix = poMatrix.filter((item) => item.name !== po);
    setPoMatrix(updatedPoMatrix);
  };

  // Function to remove a PSO from the matrix
  const removePsoFromMatrix = (pso) => {
    const updatedPsoMatrix = psoMatrix.filter((item) => item.name !== pso);
    setPsoMatrix(updatedPsoMatrix);
  };

  return (
    <div className="feedback-analysis">
      <h3>Feedback Form Analysis</h3>
      <h5>Event Name: {eventName}</h5>
      <h5>Date & Time:{formatDate(eventDate)} </h5>

      <table className="matrix-table">
        <thead>
          <tr>
            <th></th>
            {Object.keys(questionAnalysis).map((question) => (
              <th key={question}>{question}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Score</td>
            {Object.keys(questionAnalysis).map((question) => (
              <td key={question}>{questionAnalysis[question].totalScore}</td>
            ))}
          </tr>
          <tr>
            <td>Average</td>
            {Object.keys(questionAnalysis).map((question) => (
              <td key={question}>{questionAnalysis[question].averageScore}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <br/>

      <h3>Activity-PO Matrix</h3>
      <div className="matrix-input">
        <select
         
          value={selectedPo}
          onChange={(e) => setSelectedPo(e.target.value)}
        >
           <option  >Select PO</option>
          <option value="PO1">PO1</option>
          <option value="PO2">PO2</option>
          <option value="PO3">PO3</option>
          <option value="PO4">PO4</option>
          <option value="PO5">PO5</option>
          <option value="PO6">PO6</option>
          <option value="PO7">PO7</option>
          <option value="PO8">PO8</option>
          <option value="PO9">PO9</option>
          <option value="PO10">PO10</option>
          <option value="PO11">PO11</option>
          <option value="PO12">PO12</option>


        </select>
      
        <button className="add-button" onClick={addPoToMatrix}>
          Add PO
        </button>
      </div>
      <table className="matrix-table">
        <thead>
          <tr>
            <th></th>
            {poMatrix.map((po) => (
              <th key={po.name}>
                {po.name}
                <button className="delete-button" onClick={() => removePoFromMatrix(po.name)}>Delete</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mapping</td>
            {poMatrix.map((po) => (
              <td key={po.name}>
                {po.mapping}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <br/>


      <h3>Activity PSO-Matrix</h3>
      <div className="matrix-input">
        <select
          value={selectedPso}
          onChange={(e) => setSelectedPso(e.target.value)}
        >
           <option >Select PSO</option>
          <option value="PSO1">PSO1</option>
          <option value="PSO2">PSO2</option>
          <option value="PSO3">PSO3</option>3
          {/* Add more PSO options here */}
        </select>
      
        <button className="add-button" onClick={addPsoToMatrix}>
          Add PSO
        </button>
      </div>
      <table className="matrix-table">
        <thead>
          <tr>
            <th></th>
            {psoMatrix.map((pso) => (
              <th key={pso.name}>
                {pso.name}
                <button className="delete-button" onClick={() => removePsoFromMatrix(pso.name)}>Delete</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mapping</td>
            {psoMatrix.map((pso) => (
              <td key={pso.name}>
                {pso.mapping}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackAnalysis;
