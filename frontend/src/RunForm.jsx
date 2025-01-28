// RunForm.jsx
import React, { useState } from 'react';
import './runForm.css'; // Nike-like styling

function RunForm() {
  const [raceDistance, setRaceDistance] = useState('');
  const [longestRun, setLongestRun] = useState('');
  const [weeklyFrequency, setWeeklyFrequency] = useState('');
  const [runTimesPerWeek, setRunTimesPerWeek] = useState('');
  const [longRunDay, setLongRunDay] = useState('');
  const [speedWork, setSpeedWork] = useState('no');
  const [hillTraining, setHillTraining] = useState('no');
  const [raceDate, setRaceDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (
      !raceDistance ||
      !longestRun ||
      !weeklyFrequency ||
      !runTimesPerWeek ||
      !longRunDay ||
      !raceDate
    ) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    // Collect form data
    const formData = {
      raceDistance,
      longestRun,
      weeklyFrequency,
      runTimesPerWeek,
      longRunDay,
      speedWork,
      hillTraining,
      raceDate,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/plans`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);
      if (data.success) {
        alert('Training Plan Created Successfully!');
        console.log('Plan from GPT:', data.plan);
      } else {
        setError('Could not retrieve a training plan.');
      }

      // Reset form
      setRaceDistance('');
      setLongestRun('');
      setWeeklyFrequency('');
      setRunTimesPerWeek('');
      setLongRunDay('');
      setSpeedWork('no');
      setHillTraining('no');
      setRaceDate('');
    } catch (err) {
      console.error(err);
      setError('There was an issue submitting your data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="runForm">
      <h2>Customize Your Training Plan</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Race Distance */}
        <label>
          Target Race Distance (km):
          <select
            value={raceDistance}
            onChange={(e) => setRaceDistance(e.target.value)}
          >
            <option value="" disabled>-- Select --</option>
            <option value="5">5K</option>
            <option value="10">10K</option>
            <option value="21.1">Half Marathon (21.1K)</option>
            <option value="42.2">Full Marathon (42.2K)</option>
          </select>
        </label>

        {/* Current Longest Continuous Run (km) */}
        <label>
          Current Longest Continuous Run (km):
          <input
            type="number"
            min="0"
            step="0.1"
            value={longestRun}
            onChange={(e) => setLongestRun(e.target.value)}
          />
        </label>

        {/* Current Weekly Running Frequency */}
        <label>
          Current Weekly Running Frequency:
          <select
            value={weeklyFrequency}
            onChange={(e) => setWeeklyFrequency(e.target.value)}
          >
            <option value="" disabled>-- Select --</option>
            <option value="0-1">0-1 times</option>
            <option value="2-3">2-3 times</option>
            <option value="4-5">4-5 times</option>
            <option value="6+">6+ times</option>
          </select>
        </label>

        {/* How Many Times per Week Can You Run */}
        <label>
          How Many Times per Week Can You Run?
          <select
            value={runTimesPerWeek}
            onChange={(e) => setRunTimesPerWeek(e.target.value)}
          >
            <option value="" disabled>-- Select --</option>
            <option value="2">2 times</option>
            <option value="3">3 times</option>
            <option value="4">4 times</option>
            <option value="5+">5+ times</option>
          </select>
        </label>

        {/* Preferred Long Run Day */}
        <label>
          Preferred Long Run Day:
          <select
            value={longRunDay}
            onChange={(e) => setLongRunDay(e.target.value)}
          >
            <option value="" disabled>-- Select --</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </label>

        {/* Speed Work */}
        <fieldset>
          <legend>Include Speed Work?</legend>
          <label>
            <input
              type="radio"
              name="speedWork"
              value="yes"
              checked={speedWork === 'yes'}
              onChange={(e) => setSpeedWork(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="speedWork"
              value="no"
              checked={speedWork === 'no'}
              onChange={(e) => setSpeedWork(e.target.value)}
            />
            No
          </label>
        </fieldset>

        {/* Hill Training */}
        <fieldset>
          <legend>Include Hill Training?</legend>
          <label>
            <input
              type="radio"
              name="hillTraining"
              value="yes"
              checked={hillTraining === 'yes'}
              onChange={(e) => setHillTraining(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hillTraining"
              value="no"
              checked={hillTraining === 'no'}
              onChange={(e) => setHillTraining(e.target.value)}
            />
            No
          </label>
        </fieldset>

        {/* Race Date */}
        <label>
          When Is Your Race?
          <input
            type="date"
            value={raceDate}
            onChange={(e) => setRaceDate(e.target.value)}
          />
        </label>

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default RunForm;
